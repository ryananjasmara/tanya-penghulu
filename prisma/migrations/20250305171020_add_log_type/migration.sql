-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('SYSTEM', 'USER');

-- DropForeignKey
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_userId_fkey";

-- AlterTable
ALTER TABLE "activity_logs" ADD COLUMN     "type" "LogType" NOT NULL DEFAULT 'SYSTEM',
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
