-- AlterTable
ALTER TABLE "Articles" ALTER COLUMN "updated_on" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProgrammeSessions" ALTER COLUMN "completed_at" DROP NOT NULL,
ALTER COLUMN "updated_on" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Programmes" ALTER COLUMN "updated_on" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workouts" ALTER COLUMN "updated_on" DROP NOT NULL;
