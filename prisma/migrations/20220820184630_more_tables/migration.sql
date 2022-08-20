-- CreateTable
CREATE TABLE "Audios" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "audio_url" TEXT NOT NULL,
    "total_clicks" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Audios_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Workouts" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "video_url" TEXT NOT NULL,
    "total_clicks" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Articles" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_clicks" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Programmes" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_clicks" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Programmes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ProgrammeSessions" (
    "uuid" TEXT NOT NULL,
    "to_do_date_time" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "programme_uuid" TEXT NOT NULL,
    "workout_uuid" TEXT NOT NULL,
    "audio_uuid" TEXT NOT NULL,
    "article_uuid" TEXT NOT NULL,

    CONSTRAINT "ProgrammeSessions_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "ProgrammeSessions" ADD CONSTRAINT "ProgrammeSessions_programme_uuid_fkey" FOREIGN KEY ("programme_uuid") REFERENCES "Programmes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeSessions" ADD CONSTRAINT "ProgrammeSessions_workout_uuid_fkey" FOREIGN KEY ("workout_uuid") REFERENCES "Workouts"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeSessions" ADD CONSTRAINT "ProgrammeSessions_audio_uuid_fkey" FOREIGN KEY ("audio_uuid") REFERENCES "Audios"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeSessions" ADD CONSTRAINT "ProgrammeSessions_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "Articles"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
