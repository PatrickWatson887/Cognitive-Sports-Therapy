/*
  Warnings:

  - Added the required column `role_uuid` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role_uuid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Roles" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_members" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_uuid_fkey" FOREIGN KEY ("role_uuid") REFERENCES "Roles"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
