-- init
-- Create users table
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `phone_number` VARCHAR(20),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `users_username_key` (`username`),
    UNIQUE KEY `users_email_key` (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create products table
CREATE TABLE `products` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `pcode` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create product_reviews table
CREATE TABLE `product_reviews` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`review_id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create submissions table
CREATE TABLE `submissions` (
    `submission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(20),
    `email` VARCHAR(50) NOT NULL,
    `reason` ENUM('General_Inquiry', 'Pricing', 'Product_Info', 'Shipping', 'Other') NOT NULL,
    `product_id` VARCHAR(10),
    `message` TEXT NOT NULL,
    `submitted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`submission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create sessions table
CREATE TABLE `sessions` (
    `session_id` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `expires_at` DATETIME(3),
    PRIMARY KEY (`session_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- products
INSERT INTO products (name, description, price, category, image_url, pcode) 
VALUES("Aria Bralette Top", 
"This Simple Summer Crochet Kit includes everything you need to create your own comfortable and stylish Aria Bralette Top." , 
10.99, 
"Tops", 
"/images/product-1.jpg", 
"SS101");

INSERT INTO products (name, description, price, category, image_url, pcode) 
VALUES("Totoro", 
"This Adorable Amigurumi Crochet Kit includes everything you need to create your own adorable and squishy Totoro Amigurumi toy." , 
12.99, 
"Amigurumi", 
"/images/product-2.jpg", 
"AA101");

INSERT INTO products (name, description, price, category, image_url, pcode) 
VALUES("Leila Mesh Pullover", 
"This Simple Summer Crochet Kit includes everything you need to create your own comfortable and stylish Leila Mesh Pullover." , 
12.99, 
"Tops", 
"/images/product-3.jpg", 
"SS102");

INSERT INTO products (name, description, price, category, image_url, pcode) 
VALUES("Elena Book Bag", 
"This Practically Soft Crochet Kit includes everything you need to create your own lightweight and stylish Elena Book Bag." , 
14.99, 
"Bags", 
"/images/product-4.jpg", 
"PS101");

//sample product review (have not made adding reviews button, etc.)
INSERT INTO product_reviews (product_id, user_id, rating, comment)
VALUES(1, 1, 5, "So comfortable and so easy to make! Took me less than 2 hours and I've been wearing it ever since!");