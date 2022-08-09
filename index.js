import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

const PORT = process.env.PORT;
app.listen(PORT);