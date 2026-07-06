import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/config.dotenv';

const app: Application = express();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.app_url,
    credentials: true
  })
);

// root

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Fixano your trusted home service platform',
    author: 'MD Abdur Rahman Nur Jamil',
    error: 'false'
  });
});

export default app;
