-- DropIndex
DROP INDEX "CartItem_cartid_key";

-- DropIndex
DROP INDEX "CartItem_itemid_key";

-- AlterTable
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id");
