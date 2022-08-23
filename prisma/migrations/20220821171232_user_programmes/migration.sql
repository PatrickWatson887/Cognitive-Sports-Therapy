/*
  Warnings:

  - Added the required column `user_uuid` to the `Programmes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programmes" ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Programmes" ADD CONSTRAINT "Programmes_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
