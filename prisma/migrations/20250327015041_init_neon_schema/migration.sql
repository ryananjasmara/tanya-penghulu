/*
  Warnings:

  - You are about to drop the `activity_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `knowledges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `missing_answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "tanya-nikah"."VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- DropForeignKey
ALTER TABLE "tanya-nikah"."activity_logs" DROP CONSTRAINT "activity_logs_userId_fkey";

-- DropTable
DROP TABLE "tanya-nikah"."activity_logs";

-- DropTable
DROP TABLE "tanya-nikah"."knowledges";

-- DropTable
DROP TABLE "tanya-nikah"."missing_answers";

-- DropTable
DROP TABLE "tanya-nikah"."users";

-- CreateTable
CREATE TABLE "tanya-nikah"."tanya-nikah.knowledges" (
    "id" TEXT NOT NULL,
    "keywords" TEXT[],
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tanya-nikah.knowledges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tanya-nikah"."tanya-nikah.missing_answers" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tanya-nikah.missing_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tanya-nikah"."tanya-nikah.users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "tanya-nikah"."UserRole" NOT NULL DEFAULT 'STAFF',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tanya-nikah.users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tanya-nikah"."tanya-nikah.activity_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ipAddress" TEXT,
    "type" "tanya-nikah"."LogType" NOT NULL DEFAULT 'SYSTEM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "tanya-nikah.activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tanya-nikah"."tanya-nikah.chat_votes" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "knowledgeId" TEXT NOT NULL,
    "vote" "tanya-nikah"."VoteType" NOT NULL,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tanya-nikah.chat_votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tanya-nikah.missing_answers_createdAt_idx" ON "tanya-nikah"."tanya-nikah.missing_answers"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "tanya-nikah.users_email_key" ON "tanya-nikah"."tanya-nikah.users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tanya-nikah.users_username_key" ON "tanya-nikah"."tanya-nikah.users"("username");

-- CreateIndex
CREATE INDEX "tanya-nikah.activity_logs_createdAt_idx" ON "tanya-nikah"."tanya-nikah.activity_logs"("createdAt");

-- CreateIndex
CREATE INDEX "tanya-nikah.chat_votes_knowledgeId_idx" ON "tanya-nikah"."tanya-nikah.chat_votes"("knowledgeId");

-- CreateIndex
CREATE INDEX "tanya-nikah.chat_votes_vote_idx" ON "tanya-nikah"."tanya-nikah.chat_votes"("vote");

-- CreateIndex
CREATE INDEX "tanya-nikah.chat_votes_createdAt_idx" ON "tanya-nikah"."tanya-nikah.chat_votes"("createdAt");

-- AddForeignKey
ALTER TABLE "tanya-nikah"."tanya-nikah.activity_logs" ADD CONSTRAINT "tanya-nikah.activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tanya-nikah"."tanya-nikah.users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tanya-nikah"."tanya-nikah.chat_votes" ADD CONSTRAINT "tanya-nikah.chat_votes_knowledgeId_fkey" FOREIGN KEY ("knowledgeId") REFERENCES "tanya-nikah"."tanya-nikah.knowledges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
