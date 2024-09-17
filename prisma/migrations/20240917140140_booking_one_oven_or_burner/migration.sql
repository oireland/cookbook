/*
  Warnings:

  - You are about to drop the `OvenInBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookingToBurner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OvenInBooking" DROP CONSTRAINT "OvenInBooking_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "OvenInBooking" DROP CONSTRAINT "OvenInBooking_ovenId_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToBurner" DROP CONSTRAINT "_BookingToBurner_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToBurner" DROP CONSTRAINT "_BookingToBurner_B_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "burnerId" TEXT,
ADD COLUMN     "ovenId" TEXT;

-- DropTable
DROP TABLE "OvenInBooking";

-- DropTable
DROP TABLE "_BookingToBurner";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_ovenId_fkey" FOREIGN KEY ("ovenId") REFERENCES "Oven"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_burnerId_fkey" FOREIGN KEY ("burnerId") REFERENCES "Burner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
