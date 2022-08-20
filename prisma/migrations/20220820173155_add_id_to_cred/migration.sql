/*
  Warnings:

  - Added the required column `uuid` to the `Credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credentials" ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "Credentials_pkey" PRIMARY KEY ("uuid");
