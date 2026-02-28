import  request  from "supertest";
import app from "../../src/app.js";
import User from "../../src/models/User.js";


describe('JWT AUTH - Auth Controller ',()=>{
    describe('POST /api/auth/register',()=>{
        test("should register new user successfully", async () => {
            const res = await request(app)
            .post("/api/auth/register")
            .send({
                username:"testuser",
                email:"test@example.com",
                password:"password123"
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("token");
            expect(res.body.email).toBe("test@example.com");
        });
        test("should reject missing field",async ()=>{
            const res = await request(app)
            .post("/api/auth/register")
            .send({
                username:"testuser"
            });
            expect(res.status).toBe(422);
            expect(res.body.message).toContain("required fields are missing");
        });
        test("should reject duplicate email ",async () => {
            await User.create({
                username:"testuser",
                email:"test@example.com",
                password:"password123"
            })
            const res = await request(app)
            .post("/api/auth/register")
            .send({
                username:"newuser",
                email:"test@example.com",
                password:"password4567"
            })
            expect(res.status).toBe(409);
            expect(res.body.message).toContain("User already exists.")
        })
    })
})