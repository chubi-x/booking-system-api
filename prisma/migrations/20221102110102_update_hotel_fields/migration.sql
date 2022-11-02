/*
  Warnings:

  - You are about to drop the column `rating` on the `Hotel` table. All the data in the column will be lost.
  - Added the required column `stars` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "rating",
ADD COLUMN     "stars" INTEGER NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE TEXT;
