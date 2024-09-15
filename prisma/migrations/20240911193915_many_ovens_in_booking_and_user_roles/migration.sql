/*
  Warnings:

  - You are about to drop the column `numberofShelves` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Hob` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfShelves` on the `Kitchen` table. All the data in the column will be lost.
  - Added the required column `name` to the `Hob` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'MEMBER');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_kitchenId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "numberofShelves";

-- AlterTable
ALTER TABLE "Hob" DROP COLUMN "description",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Kitchen" DROP COLUMN "numberOfShelves";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER',
ALTER COLUMN "kitchenId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Oven" (
    "ovenId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfShelves" INTEGER NOT NULL,
    "kitchenId" TEXT NOT NULL,

    CONSTRAINT "Oven_pkey" PRIMARY KEY ("ovenId")
);

-- CreateTable
CREATE TABLE "OvenInBooking" (
    "ovenId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "numberOfShelves" INTEGER NOT NULL,
    "ovenTemperature" INTEGER NOT NULL,

    CONSTRAINT "OvenInBooking_pkey" PRIMARY KEY ("ovenId","bookingId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("kitchenId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oven" ADD CONSTRAINT "Oven_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("kitchenId") ON DELETE RESTRICT ON UPDATE CASCADE;
