-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'TECHNICIAN', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserActiveStatus" AS ENUM ('ACTIVE', 'BANNED');

-- CreateTable
CREATE TABLE "technicians" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "yearsExperience" INTEGER DEFAULT 0,
    "hourlyRate" DECIMAL(10,2) DEFAULT 10,
    "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "status" "UserActiveStatus" NOT NULL DEFAULT 'ACTIVE',
    "phone" VARCHAR(20),
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "technicians_userId_key" ON "technicians"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "technicians" ADD CONSTRAINT "technicians_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
