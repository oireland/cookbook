/*
  Warnings:

  - A unique constraint covering the columns `[shortCode]` on the table `Kitchen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortCode` to the `Kitchen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kitchen" ADD COLUMN     "shortCode" VARCHAR(8) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_shortCode_key" ON "Kitchen"("shortCode");
