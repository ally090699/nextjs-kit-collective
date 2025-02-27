/*
  Warnings:

  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Submission`;

-- CreateTable
CREATE TABLE `submissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(50) NOT NULL,
    `reason` VARCHAR(20) NOT NULL,
    `productId` VARCHAR(10) NULL,
    `message` TEXT NOT NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
