import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/config.dotenv';
import { authRouter } from './modules/auth/auth.route';
import { notFound } from './middleware/notFound.middleware';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { adminRoute } from './modules/admin/admin.route';
import { serviceRoute } from './modules/service/service.route';
import { technicianRoute } from './modules/technician/technician.router';
import { bookingRouter } from './modules/booking/booking.router';
import { paymentRoute } from './modules/payment/payment.router';

const app: Application = express();

// webhook
app.use('/api/v1/fixano/payment/webhook', express.raw({type: "application/json"}))

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

// ? ROUTES

// ! USERS
app.use('/api/v1/fixano/auth/users', authRouter);

// ! ADMIN
app.use('/api/v1/fixano/admin', adminRoute)

// ? SERVICE (PUBLIC)
app.use('/api/v1/fixano', serviceRoute)

// ! TECHNICIAN 
app.use('/api/v1/fixano/technician', technicianRoute)

// ! BOOKING
app.use('/api/v1/fixano/bookings' , bookingRouter)

// ! STRIPE PAYMENT 

app.use('/api/v1/fixano/payment', paymentRoute)

// ! wrong route
app.use(notFound);
// ! global error
app.use(globalErrorHandler);

export default app;
