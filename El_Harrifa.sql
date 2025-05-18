create database El_Harrifa;

use El_Harrifa;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nameuser VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    passworduser VARCHAR(255),
    address TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at DATETIME
);

CREATE TABLE Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    description TEXT
);

CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    image_url TEXT,
    category VARCHAR(100),
    details JSON,
    seller_id INT,
    created_at DATETIME,
    FOREIGN KEY (category) REFERENCES Categories(name),
    FOREIGN KEY (seller_id) REFERENCES Users(id)
);

CREATE TABLE Cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    rating INT,
    comment TEXT,
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    status VARCHAR(50),
    total_price DECIMAL(10, 2),
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE OrderItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Shipping (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    address TEXT,
    shipped_at DATETIME,
    delivered_at DATETIME,
    status VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES Orders(id)
);

CREATE TABLE Payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    method VARCHAR(50),
    status VARCHAR(50),
    paid_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES Orders(id)
);
