-- CreateTable
CREATE TABLE "missing_answers" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "missing_answers_pkey" PRIMARY KEY ("id")
);
