/*
  Warnings:

  - You are about to drop the column `university_uuid` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Universities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sponsor_uuid` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_university_uuid_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "university_uuid",
ADD COLUMN     "sponsor_uuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "Universities";

-- CreateTable
CREATE TABLE "Sponsors" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_members" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sponsors_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_sponsor_uuid_fkey" FOREIGN KEY ("sponsor_uuid") REFERENCES "Sponsors"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
