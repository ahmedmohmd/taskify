-- AlterTable
ALTER TABLE "SubTask" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "labels" TEXT[] DEFAULT ARRAY[]::TEXT[];
