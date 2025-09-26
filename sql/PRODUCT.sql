use BrewDesk;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

UPDATE products 
SET name="yash2"
WHERE id=1;

SELECT * FROM products;

INSERT INTO products (name, category, price, stock) VALUES
("Aloo Tikki", "Burger", 60,40);

DROP TABLE products;
 
TRUNCATE TABLE products;
 
