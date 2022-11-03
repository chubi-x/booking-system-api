/*
  Warnings:

  - A unique constraint covering the columns `[hotelId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_hotelId_key" ON "Room"("hotelId");
