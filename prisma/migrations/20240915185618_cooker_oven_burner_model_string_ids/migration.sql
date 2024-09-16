/*
  Warnings:

  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookingId` on the `Booking` table. All the data in the column will be lost.
  - The primary key for the `Kitchen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kitchenId` on the `Kitchen` table. All the data in the column will be lost.
  - The primary key for the `Oven` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kitchenId` on the `Oven` table. All the data in the column will be lost.
  - You are about to drop the column `ovenId` on the `Oven` table. All the data in the column will be lost.
  - The primary key for the `OvenInBooking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Hob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookingToHob` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `Booking` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Kitchen` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `cookerId` to the `Oven` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Oven` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Hob" DROP CONSTRAINT "Hob_kitchenId_fkey";

-- DropForeignKey
ALTER TABLE "Oven" DROP CONSTRAINT "Oven_kitchenId_fkey";

-- DropForeignKey
ALTER TABLE "OvenInBooking" DROP CONSTRAINT "OvenInBooking_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "OvenInBooking" DROP CONSTRAINT "OvenInBooking_ovenId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_kitchenId_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToHob" DROP CONSTRAINT "_BookingToHob_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToHob" DROP CONSTRAINT "_BookingToHob_B_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pkey",
DROP COLUMN "bookingId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Kitchen" DROP CONSTRAINT "Kitchen_pkey",
DROP COLUMN "kitchenId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Oven" DROP CONSTRAINT "Oven_pkey",
DROP COLUMN "kitchenId",
DROP COLUMN "ovenId",
ADD COLUMN     "cookerId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Oven_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OvenInBooking" DROP CONSTRAINT "OvenInBooking_pkey",
ALTER COLUMN "ovenId" SET DATA TYPE TEXT,
ALTER COLUMN "bookingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OvenInBooking_pkey" PRIMARY KEY ("ovenId", "bookingId");

-- DropTable
DROP TABLE "Hob";

-- DropTable
DROP TABLE "_BookingToHob";

-- CreateTable
CREATE TABLE "Cooker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,

    CONSTRAINT "Cooker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Burner" (
    "id" TEXT NOT NULL,
    "burnerName" TEXT NOT NULL,
    "cookerId" TEXT NOT NULL,

    CONSTRAINT "Burner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookingToBurner" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToBurner_AB_unique" ON "_BookingToBurner"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToBurner_B_index" ON "_BookingToBurner"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oven" ADD CONSTRAINT "Oven_cookerId_fkey" FOREIGN KEY ("cookerId") REFERENCES "Cooker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvenInBooking" ADD CONSTRAINT "OvenInBooking_ovenId_fkey" FOREIGN KEY ("ovenId") REFERENCES "Oven"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvenInBooking" ADD CONSTRAINT "OvenInBooking_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cooker" ADD CONSTRAINT "Cooker_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Burner" ADD CONSTRAINT "Burner_cookerId_fkey" FOREIGN KEY ("cookerId") REFERENCES "Cooker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToBurner" ADD CONSTRAINT "_BookingToBurner_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToBurner" ADD CONSTRAINT "_BookingToBurner_B_fkey" FOREIGN KEY ("B") REFERENCES "Burner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
