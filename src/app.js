import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import protectedRouter from './routes/auth.routes.js';
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth',authRouter);
app.use('/api/protect',protectedRouter);

export default app;