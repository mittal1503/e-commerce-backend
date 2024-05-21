/*
  Warnings:

  - Added the required column `userid` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "userid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "cartid" INTEGER NOT NULL,
    "itemid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userid_key" ON "Cart"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartid_key" ON "CartItem"("cartid");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_itemid_key" ON "CartItem"("itemid");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartid_fkey" FOREIGN KEY ("cartid") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
