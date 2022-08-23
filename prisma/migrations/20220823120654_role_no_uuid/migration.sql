/*
  Warnings:

  - The primary key for the `Roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `role_uuid` on the `Users` table. All the data in the column will be lost.
  - Added the required column `role_title` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_role_uuid_fkey";

-- AlterTable
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_pkey",
DROP COLUMN "uuid",
ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("title");

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "role_uuid",
ADD COLUMN     "role_title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_title_fkey" FOREIGN KEY ("role_title") REFERENCES "Roles"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
