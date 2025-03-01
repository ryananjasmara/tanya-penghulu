/*
  Warnings:

  - You are about to drop the `Knowledge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Knowledge";

-- CreateTable
CREATE TABLE "knowledges" (
    "id" TEXT NOT NULL,
    "keywords" TEXT[],
    "answer" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledges_pkey" PRIMARY KEY ("id")
);
