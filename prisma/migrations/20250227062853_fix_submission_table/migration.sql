/*
  Warnings:

  - The primary key for the `submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `submissions` table. All the data in the column will be lost.
  - Added the required column `submission_id` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `submissions` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `productId`,
    DROP COLUMN `submittedAt`,
    ADD COLUMN `product_id` VARCHAR(10) NULL,
    ADD COLUMN `submission_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `submitted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`submission_id`);
