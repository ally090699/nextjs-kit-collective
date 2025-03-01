/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `reason` on the `submissions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `price` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `submissions` MODIFY `reason` ENUM('General_Inquiry', 'Pricing', 'Product_Info', 'Shipping', 'Other') NOT NULL;

-- CreateTable
CREATE TABLE `sessions` (
    `session_id` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `expires_at` DATETIME(3) NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_reviews` ADD CONSTRAINT `product_reviews_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_reviews` ADD CONSTRAINT `product_reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
