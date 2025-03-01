// products
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