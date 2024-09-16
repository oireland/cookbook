-- DropForeignKey
ALTER TABLE "Burner" DROP CONSTRAINT "Burner_cookerId_fkey";

-- DropForeignKey
ALTER TABLE "Cooker" DROP CONSTRAINT "Cooker_kitchenId_fkey";

-- DropForeignKey
ALTER TABLE "Oven" DROP CONSTRAINT "Oven_cookerId_fkey";

-- AddForeignKey
ALTER TABLE "Oven" ADD CONSTRAINT "Oven_cookerId_fkey" FOREIGN KEY ("cookerId") REFERENCES "Cooker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cooker" ADD CONSTRAINT "Cooker_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Burner" ADD CONSTRAINT "Burner_cookerId_fkey" FOREIGN KEY ("cookerId") REFERENCES "Cooker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
