-- AlterTable
ALTER TABLE "Articles" ALTER COLUMN "total_clicks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Audios" ALTER COLUMN "total_clicks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Programmes" ALTER COLUMN "total_clicks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserDiaries" ALTER COLUMN "total_clicks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workouts" ALTER COLUMN "total_clicks" DROP NOT NULL;
