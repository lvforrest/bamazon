DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;


CREATE table products(
    item_id INT auto_increment NOT NULL,
    productName VARCHAR(50) NOT NULL,
    department_name VARCHAR(50), NOT NULL,
    price DECIMAL (10,4) NOT NULL,
    stockquanity INT(10) NOT NULL,
    primary key (item_id)
);


INSERT INTO products(productName, department_name,price,stockquanity)
VALUES ("basketball","sporting goods", 20.00, 50),
("tennis balls", "sporting goods", 10.50, 25),
("deodorant", "personal hygiene", 3.99,100),
("NBA Jersey", "athletic wear", 60.99, 23),
("Aquafina", "drinks", 7.99, 100),
("Gatorade", "drinks", 10.95,100),
("protein bars", "snacks", 5.00, 30),
("hair bands", "hair", 4.00, 75),
("clipboard", "school supplies", 8.50, 25),
("nike vapor max", "shoes", 100.00, 20)

SELECT * FROM products;