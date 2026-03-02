import request  from "supertest";
import express from 'express';
import jwt from 'jsonwebtoken';
import { authorizeUser } from "../../src/jwt-auth/protect.js";
import User from "../../src/models/User.js";

const app = express();

app.use(express.json());

app.get('/profile',authorizeUser,(req,res)=>{
    const userId = req.userId
    res.status(200).json({message:"User is authorized",user:userId});
});

describe('Middleware - authorizeUser',()=>{
    let user;
    let userId
    let token;

    beforeEach(async()=>{
        user = await  User.create({
            username:"test123",
            email:"test@test.com",
            password:"password"
        })
        userId = user._id;
        token = jwt.sign({userId},
            process.env.JWT_SECRET,
            {algorithm: 'HS256' , expiresIn:'7d'}
        );
 
    });
    test("should allow access with a valid token", async()=>{
       

        const res = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${token}`);


        expect(res.status).toBe(200);
        expect(res.body.message).toContain("User is authorized");
        expect(res.body.user).toBe(userId.toString());


    });
    test("should reject if authorization header is not present", async()=>{
        const res = await request(app)
        .get("/profile");


        expect(res.status).toBe(401);
        expect(res.body.message).toContain("User not authorized");
    });
    test("should reject if token is not valid",async()=>{
        const res = await request(app)
        .get('/profile')
        .set("Authorization", `Bearer not a real token`);

        expect(res.status).toBe(401);
        expect(res.body.message).toContain("Invalid token");
    });

    test("should reject if token is valid but user does not exists",async()=>{
        const fakeId = "60d216f21234567890abcdef";
        token = jwt.sign({userId:fakeId},
            process.env.JWT_SECRET,
            {algorithm: 'HS256' , expiresIn:'7d'}
        );
        const res = await request(app)
        .get('/profile')
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(401);
        expect(res.body.message).toContain("Your account is deleted");
    });

    test("should reject the expired token", async()=>{
        token = jwt.sign({userId},
            process.env.JWT_SECRET,
            {algorithm: 'HS256' , expiresIn:'-1h'}
        );
        const res = await request(app)
        .get('/profile')
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(401);
        expect(res.body.message).toContain("Need to login again");
        
    })

})