-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('weekday_centric', 'weekend_centric');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('pending_setup', 'active', 'completed', 'expired');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('pending', 'in_progress', 'completed', 'backlogged');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('email', 'google');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('article', 'problem');

-- CreateEnum
CREATE TYPE "LanguageFluencyTag" AS ENUM ('java', 'cpp', 'python', 'all');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT,
    "authProvider" "AuthProvider" NOT NULL DEFAULT 'email',
    "googleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "durationDays" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL,
    "planType" "PlanType" NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'pending_setup',
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyllabusItem" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemOrder" INTEGER NOT NULL,

    CONSTRAINT "SyllabusItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "contentType" "ContentType" NOT NULL,
    "contentBody" JSONB NOT NULL,
    "languageFluencyTag" "LanguageFluencyTag" NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskProgress" (
    "id" SERIAL NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "syllabusItemId" INTEGER NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'pending',
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "assignedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllabusItem" ADD CONSTRAINT "SyllabusItem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD CONSTRAINT "TaskProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD CONSTRAINT "TaskProgress_syllabusItemId_fkey" FOREIGN KEY ("syllabusItemId") REFERENCES "SyllabusItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
