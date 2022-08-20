/*
  Warnings:

  - You are about to drop the column `role` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "role";

-- DropEnum
DROP TYPE "user_role_enum";

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
