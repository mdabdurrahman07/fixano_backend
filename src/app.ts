import express, { Application, Request, Response } from 'express';

const app: Application = express();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Fixano your trusted home service platform',
    author: 'MD Abdur Rahman Nur Jamil',
    error: 'false'
  });
});

export default app;
