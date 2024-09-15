-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Hob" DROP CONSTRAINT "Hob_kitchenId_fkey";

-- DropForeignKey
ALTER TABLE "Oven" DROP CONSTRAINT "Oven_kitchenId_fkey";

-- AddForeignKey
ALTER TABLE "Oven" ADD CONSTRAINT "Oven_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("kitchenId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvenInBooking" ADD CONSTRAINT "OvenInBooking_ovenId_fkey" FOREIGN KEY ("ovenId") REFERENCES "Oven"("ovenId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvenInBooking" ADD CONSTRAINT "OvenInBooking_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("bookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hob" ADD CONSTRAINT "Hob_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("kitchenId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
