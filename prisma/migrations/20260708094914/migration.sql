/*
  Warnings:

  - A unique constraint covering the columns `[technicianId,dayOfWeek]` on the table `availabilities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "availabilities_technicianId_dayOfWeek_idx";

-- CreateIndex
CREATE UNIQUE INDEX "availabilities_technicianId_dayOfWeek_key" ON "availabilities"("technicianId", "dayOfWeek");
