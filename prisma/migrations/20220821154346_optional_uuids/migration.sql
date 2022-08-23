-- DropForeignKey
ALTER TABLE "ProgrammeSessions" DROP CONSTRAINT "ProgrammeSessions_article_uuid_fkey";

-- DropForeignKey
ALTER TABLE "ProgrammeSessions" DROP CONSTRAINT "ProgrammeSessions_audio_uuid_fkey";

-- DropForeignKey
ALTER TABLE "ProgrammeSessions" DROP CONSTRAINT "ProgrammeSessions_programme_uuid_fkey";

-- DropForeignKey
ALTER TABLE "ProgrammeSessions" DROP CONSTRAINT "ProgrammeSessions_workout_uuid_fkey";

-- AlterTable
ALTER TABLE "ProgrammeSessions" ALTER COLUMN "programme_uuid" DROP NOT NULL,
ALTER COLUMN "workout_uuid" DROP NOT NULL,
ALTER COLUMN "audio_uuid" DROP NOT NULL,
ALTER COLUMN "article_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProgrammeSessions" ADD CONSTRAINT "ProgrammeSessions_programme_uuid_fkey" FOREIGN KEY ("programme_uuid") REFERENCES "Programmes"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeSessions" ADD CONSTRAINT "ProgrammeSessions_workout_uuid_fkey" FOREIGN KEY ("workout_uuid") REFERENCES "Workouts"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeSessions" ADD CONSTRAINT "ProgrammeSessions_audio_uuid_fkey" FOREIGN KEY ("audio_uuid") REFERENCES "Audios"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeSessions" ADD CONSTRAINT "ProgrammeSessions_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "Articles"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
