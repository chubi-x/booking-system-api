/*
  Warnings:

  - Changed the type of `kind` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoomKind" AS ENUM ('STANDARD', 'DELUXE', 'EXECUTIVE', 'PRESIDENTIAL');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "kind",
ADD COLUMN     "kind" "RoomKind" NOT NULL;
