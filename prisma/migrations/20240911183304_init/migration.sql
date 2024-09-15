-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Kitchen" (
    "kitchenId" TEXT NOT NULL,
    "numberOfShelves" INTEGER NOT NULL,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("kitchenId")
);

-- CreateTable
CREATE TABLE "Hob" (
    "hobId" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "kitchenId" TEXT NOT NULL,

    CONSTRAINT "Hob_pkey" PRIMARY KEY ("hobId")
);

-- CreateTable
CREATE TABLE "Booking" (
    "bookingId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "numberofShelves" INTEGER NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "_BookingToHob" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToHob_AB_unique" ON "_BookingToHob"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToHob_B_index" ON "_BookingToHob"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("kitchenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hob" ADD CONSTRAINT "Hob_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("kitchenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToHob" ADD CONSTRAINT "_BookingToHob_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("bookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToHob" ADD CONSTRAINT "_BookingToHob_B_fkey" FOREIGN KEY ("B") REFERENCES "Hob"("hobId") ON DELETE CASCADE ON UPDATE CASCADE;
