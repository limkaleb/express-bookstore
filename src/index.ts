import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});


