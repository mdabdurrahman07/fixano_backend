# Fixano

## Project Overview
- Title: Fixano
- Description: "Fixano is a backend API for a home services marketplace. Customers can browse available services (plumbing, electrical, cleaning, painting, etc.), book qualified technicians, and leave reviews. Technicians can create service profiles, manage their availability, and handle job bookings. Admins oversee the platform, manage users, and moderate service categories."
- Tech Stack: TypeScript 6.0.3, Express.js 5.2.1, Node.js (version not pinned in package.json), Prisma 7.8.0, JWT (jsonwebtoken 9.0.3), bcryptjs 3.0.3, Stripe 22.3.0, PostgreSQL via Prisma and pg 8.22.0; additional dependencies include cors 2.8.6, cookie-parser 1.4.7, dotenv 17.4.2, and http-status 2.1.0.

## Getting Started
- Prerequisites
  - Node.js:  24.14.1 or above
  - Package manager: npm (package-lock.json is present; no packageManager field was found in package.json)
  - PostgreSQL access: required through DATABASE_URL and the Prisma datasource configuration
  - Stripe CLI: recommended for local webhook testing
- Environment Variables
```env
# Port for the Express server
PORT=...

# PostgreSQL connection string for Prisma
DATABASE_URL=...

# Runtime environment
NODE_ENV=...

# Application base URL used by CORS
APP_URL=...

# Password hashing cost factor
BCRYPT_SALT_ROUNDS=...

# JWT secret for access tokens
JWT_ACCESS_SECRET=...

# JWT secret for refresh tokens
JWT_REFRESH_SECRET=...

# JWT expiration setting for access tokens
JWT_ACCESS_EXPIRES_IN=...

# JWT expiration setting for refresh tokens
JWT_REFRESH_EXPIRES_IN=...

# Stripe secret key
STRIPE_SECRET_KEY=...

# Stripe webhook signing secret
STRIPE_WEBHOOK_SECRET_KEY=...
```
- Installation
```bash
npm install
npx prisma generate
npx prisma migrate dev
```
- Running the Application
```bash
npm run dev
npm run build
npm run start
```

## API Documentation & Architecture
### Core Endpoints

#### Auth
| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | /api/v1/fixano/auth/users/register | None | Register a new customer or technician account. |
| POST | /api/v1/fixano/auth/users/login | None | Authenticate a user and issue access and refresh tokens. |
| GET | /api/v1/fixano/auth/users/me | CUSTOMER, TECHNICIAN, ADMIN | Retrieve the authenticated user's profile. |
| POST | /api/v1/fixano/auth/users/refreshToken | None | Refresh the access token using the refresh token cookie. |

#### Admin
| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| GET | /api/v1/fixano/admin/users | ADMIN | Retrieve all users. |
| PATCH | /api/v1/fixano/admin/users/:id | ADMIN | Update a user's active status. |
| GET | /api/v1/fixano/admin/bookings | ADMIN | Retrieve all bookings. |
| GET | /api/v1/fixano/admin/categories | ADMIN | Retrieve all categories. |
| POST | /api/v1/fixano/admin/categories | ADMIN | Create a new category. |

#### Service
| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| GET | /api/v1/fixano/services | None | Retrieve services. |
| GET | /api/v1/fixano/technicians | None | Retrieve technicians. |
| GET | /api/v1/fixano/technicians/:id | None | Retrieve a single technician by ID. |
| GET | /api/v1/fixano/categories | None | Retrieve categories. |

#### Technician
| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | /api/v1/fixano/technician/service | TECHNICIAN, ADMIN | Create a service for the authenticated technician. |
| PUT | /api/v1/fixano/technician/profile | TECHNICIAN, ADMIN | Update the technician profile. |
| PUT | /api/v1/fixano/technician/availability | TECHNICIAN, ADMIN | Update technician availability. |
| GET | /api/v1/fixano/technician/bookings | TECHNICIAN, ADMIN | Retrieve bookings for the authenticated technician. |
| PATCH | /api/v1/fixano/technician/bookings/:id | TECHNICIAN, ADMIN | Update a booking status for the authenticated technician. |

#### Booking
| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | /api/v1/fixano/bookings | CUSTOMER, ADMIN | Create a new booking. |
| GET | /api/v1/fixano/bookings | CUSTOMER, ADMIN | Retrieve bookings for the authenticated user. |
| GET | /api/v1/fixano/bookings/:id | CUSTOMER, ADMIN | Retrieve a single booking by ID. |

#### Payment
| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | /api/v1/fixano/payment/checkout/:id | CUSTOMER, ADMIN | Create a Stripe checkout session for a booking. |
| POST | /api/v1/fixano/payment/webhook | None | Handle Stripe webhook events. |
| GET | /api/v1/fixano/payment/status/:id | CUSTOMER, ADMIN | Retrieve payment status for a booking. |

#### Review
| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | /api/v1/fixano/review | CUSTOMER, ADMIN | Create a review for a completed booking. |
| DELETE | /api/v1/fixano/review/:id | CUSTOMER, ADMIN | Delete a review by ID. |

### API Specs Link
Not yet published.

### Database Schema
| Model | Key Fields | Relations |
| --- | --- | --- |
| User | id, name, email, password, role, status, phone, avatarUrl | technician, bookings, reviews, payments |
| Technician | id, bio, yearsExperience, hourlyRate, avgRating, totalReviews, isVerified, userId | user, availabilities, bookings, services, reviews |
| Service | id, title, description, price, durationMinutes, isActive, technicianId, categoryId | technician, category, bookings |
| Category | id, name, description, iconUrl | services |
| Availability | id, dayOfWeek, startTime, endTime, technicianId | technician |
| Booking | id, status, scheduledAt, address, notes, totalAmount, customerId, technicianId, serviceId | customer, technician, service, reviews, payment |
| Review | id, rating, comment, bookingId, customerId, technicianId | booking, customer, technician |
| payment | id, amount, provider, status, stripePaymentIntentId, stripeSessionId, paidAt, bookingId, customerId | booking, user |

## ER Diagram
![FIXANO ER DIAGRAM](https://i.ibb.co.com/1GyMRR2G/fixano-er-diagram-draw-sql.jpg)

## Author
- [MD Abdur Rahman Nur Jamil](https://github.com/mdabdurrahman07)
