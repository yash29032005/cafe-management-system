use BrewDesk;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('employee', 'manager', 'admin') NOT NULL DEFAULT 'employee',
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

UPDATE users 
SET name="yash2",role="admin"
WHERE email="yash2@gmail.com";

SELECT * FROM users;

INSERT INTO users (name, email, password) VALUES
("Yash", "yash@gmail.com", "yash1234");

DROP TABLE users;
 
TRUNCATE TABLE users;
 
