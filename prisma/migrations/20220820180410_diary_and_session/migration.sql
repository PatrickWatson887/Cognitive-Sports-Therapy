-- CreateTable
CREATE TABLE "UserDiaries" (
    "uuid" TEXT NOT NULL,
    "total_clicks" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "diary_uuid" TEXT NOT NULL,

    CONSTRAINT "UserDiaries_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DiaryEntries" (
    "uuid" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_diary_uuid" TEXT NOT NULL,

    CONSTRAINT "DiaryEntries_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserSessions" (
    "uuid" TEXT NOT NULL,
    "expected_time_on" TEXT NOT NULL,
    "actual_time_on" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "diary_uuid" TEXT NOT NULL,

    CONSTRAINT "UserSessions_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "UserDiaries" ADD CONSTRAINT "UserDiaries_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiaries" ADD CONSTRAINT "UserDiaries_diary_uuid_fkey" FOREIGN KEY ("diary_uuid") REFERENCES "Diaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryEntries" ADD CONSTRAINT "DiaryEntries_user_diary_uuid_fkey" FOREIGN KEY ("user_diary_uuid") REFERENCES "UserDiaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessions" ADD CONSTRAINT "UserSessions_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessions" ADD CONSTRAINT "UserSessions_diary_uuid_fkey" FOREIGN KEY ("diary_uuid") REFERENCES "Diaries"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
