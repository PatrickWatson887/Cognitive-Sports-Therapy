/*
  Warnings:

  - You are about to drop the column `video_url` on the `Workouts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workouts" DROP COLUMN "video_url",
ADD COLUMN     "video_uuid" TEXT;

-- CreateTable
CREATE TABLE "Videos" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_video_uuid_fkey" FOREIGN KEY ("video_uuid") REFERENCES "Videos"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
