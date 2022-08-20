/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Users_email_key";

-- DropIndex
DROP INDEX "Users_name_key";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "role" DROP DEFAULT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("uuid");

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Communities" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_members" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "Communities_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Univerisities" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_members" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "Univerisities_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Diaries" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "Diaries_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Communities" ADD CONSTRAINT "Communities_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Univerisities" ADD CONSTRAINT "Univerisities_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diaries" ADD CONSTRAINT "Diaries_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
