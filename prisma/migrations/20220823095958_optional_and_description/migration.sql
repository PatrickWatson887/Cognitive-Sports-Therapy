/*
  Warnings:

  - You are about to drop the column `update_on` on the `Resources` table. All the data in the column will be lost.
  - Added the required column `desription` to the `Resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resources" DROP COLUMN "update_on",
ADD COLUMN     "desription" TEXT NOT NULL,
ADD COLUMN     "updated_on" TIMESTAMP(3);
