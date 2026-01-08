-- CreateTable
CREATE TABLE "DefaultSyllabus" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "fileName" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DefaultSyllabus_pkey" PRIMARY KEY ("id")
);
