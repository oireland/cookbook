/*
  Warnings:

  - You are about to drop the column `burnerName` on the `Burner` table. All the data in the column will be lost.
  - Added the required column `name` to the `Burner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Burner" DROP COLUMN "burnerName",
ADD COLUMN     "name" TEXT NOT NULL;
