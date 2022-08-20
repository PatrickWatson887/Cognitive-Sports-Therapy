/*
  Warnings:

  - You are about to drop the column `user_uuid` on the `Communities` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `Diaries` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `Univerisities` table. All the data in the column will be lost.
  - Added the required column `community_uuid` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diary_uuid` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university_uuid` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Communities" DROP CONSTRAINT "Communities_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Diaries" DROP CONSTRAINT "Diaries_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Univerisities" DROP CONSTRAINT "Univerisities_user_uuid_fkey";

-- AlterTable
ALTER TABLE "Communities" DROP COLUMN "user_uuid";

-- AlterTable
ALTER TABLE "Diaries" DROP COLUMN "user_uuid";

-- AlterTable
ALTER TABLE "Univerisities" DROP COLUMN "user_uuid";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "community_uuid" TEXT NOT NULL,
ADD COLUMN     "diary_uuid" TEXT NOT NULL,
ADD COLUMN     "university_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_community_uuid_fkey" FOREIGN KEY ("community_uuid") REFERENCES "Communities"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_university_uuid_fkey" FOREIGN KEY ("university_uuid") REFERENCES "Univerisities"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_diary_uuid_fkey" FOREIGN KEY ("diary_uuid") REFERENCES "Diaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
