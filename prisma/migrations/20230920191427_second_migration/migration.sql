/*
 Warnings:
 
 - You are about to drop the column `discription` on the `SubTask` table. All the data in the column will be lost.
 
 */
-- AlterTable
ALTER TABLE
  "SubTask" DROP COLUMN "discription",
ADD
  COLUMN "description" TEXT;