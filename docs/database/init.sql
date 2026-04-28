-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS vives_db;
USE vives_db;

-- TABLE: Users
CREATE TABLE IF NOT EXISTS Users (
    id_usur INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'miembro') DEFAULT 'miembro',
    image VARCHAR(255)
);

-- TABLE: Houses
CREATE TABLE IF NOT EXISTS Houses (
    id_house INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    number_of_rooms INT,
    image VARCHAR(255),
    level INT DEFAULT 1,
);

-- TABLE: HouseMembers
CREATE TABLE IF NOT EXISTS HouseMembers (
    id_membership INT AUTO_INCREMENT PRIMARY KEY,
    id_house INT NOT NULL,
    id_user INT NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_house) REFERENCES Houses(id_house) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE
);

-- TABLE: Tasks
CREATE TABLE IF NOT EXISTS Tasks (
    id_task INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    state ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    expiration_date DATE,
    id_house INT NOT NULL,
    id_user INT,
    FOREIGN KEY (id_house) REFERENCES Houses(id_house) ON DELETE RESTRICT,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE SET NULL
);

-- TABLE: Expenses
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

-- TABLE: Debts
CREATE TABLE IF NOT EXISTS Debts (
    id_debt INT AUTO_INCREMENT PRIMARY KEY,
    id_expense INT NOT NULL,
    id_user INT NOT NULL, 
    amount DECIMAL(10, 2) NOT NULL, 
    paid BOOLEAN DEFAULT FALSE,   
    FOREIGN KEY (id_expense) REFERENCES Expenses(id_expense) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE RESTRICT
);

-- PROCEDIMIENTO ALMACENADO: Borrar tareas completadas
DELIMITER //

CREATE PROCEDURE DeleteCompletedTasks()
BEGIN
    -- Elimina las tareas completadas y su fecha límite pasó hace más de 30 días
    DELETE FROM Tasks 
    WHERE state = 'completed' 
    AND expiration_date < DATE_SUB(CURDATE(), INTERVAL 30 DAY);
END //

DELIMITER ;