/*
  Warnings:

  - You are about to drop the `Univerisities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_university_uuid_fkey";

-- DropTable
DROP TABLE "Univerisities";

-- CreateTable
CREATE TABLE "Universities" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_members" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Universities_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_university_uuid_fkey" FOREIGN KEY ("university_uuid") REFERENCES "Universities"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
