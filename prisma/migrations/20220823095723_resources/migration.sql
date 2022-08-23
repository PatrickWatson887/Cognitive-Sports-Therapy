-- CreateTable
CREATE TABLE "Resources" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "update_on" TIMESTAMP(3) NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sponsor_uuid" TEXT NOT NULL,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_sponsor_uuid_fkey" FOREIGN KEY ("sponsor_uuid") REFERENCES "Sponsors"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
