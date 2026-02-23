import express from 'express';
import { registerUser } from '../jwt-auth/controllers/auth.js';

const router = express.Router();



router.post('/register',registerUser);



export default router;