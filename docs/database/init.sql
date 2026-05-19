DROP DATABASE IF EXISTS vives_db;
CREATE DATABASE vives_db;
USE vives_db;


CREATE TABLE IF NOT EXISTS Users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'member') DEFAULT 'member',
    image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Houses (
    id_house INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    number_of_rooms INT,
    level INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS HouseMembers (
    id_membership INT AUTO_INCREMENT PRIMARY KEY,
    id_house INT NOT NULL,
    id_user INT NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_house) REFERENCES Houses(id_house) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Tasks (
    id_task INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    state ENUM('pending', 'complete') DEFAULT 'pending',
    expiration_date DATE,
    id_house INT NOT NULL,
    id_user INT,
    FOREIGN KEY (id_house) REFERENCES Houses(id_house) ON DELETE RESTRICT,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Expenses (
    id_expense INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    id_user INT NOT NULL, 
    id_house INT NOT NULL,    
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE RESTRICT,
    FOREIGN KEY (id_house) REFERENCES Houses(id_house) ON DELETE RESTRICT
);
