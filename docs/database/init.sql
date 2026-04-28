-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS vives_db;
USE vives_db;

-- TABLE: Users
CREATE TABLE IF NOT EXISTS Users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'member') DEFAULT 'member',
    image VARCHAR(255)
);

-- TABLE: Houses
CREATE TABLE IF NOT EXISTS Houses (
    id_house INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    number_of_rooms INT,
    image VARCHAR(255),
    level INT DEFAULT 1
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

-- Inserción de Datos

--(La contraseña para todos es 'password123' hasheada con bcrypt)
INSERT INTO Users (name, email, password, rol) VALUES
('David', 'david@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'admin'),
('Ana', 'ana@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member'),
('Carlos', 'carlos@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member'),
('Laura', 'laura@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member'),
('Pedro', 'pedro@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'admin'),
('Maria', 'maria@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member'),
('Jorge', 'jorge@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member'),
('Sofia', 'sofia@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member'),
('Diego', 'diego@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'admin'),
('Elena', 'elena@example.com', '$2a$10$xn3igHW3Ovn1s0o2m8U.bOH0rMGEbVn9S6hOcdw.P91M2tV4D5Kvy', 'member');

INSERT INTO Houses (name, address, number_of_rooms, level) VALUES
('Piso Estudiantes', 'Calle Mayor 1', 3, 1),
('Apartamento Centro', 'Plaza Sol 5', 2, 2),
('Chalet Afueras', 'Avenida Robles 45', 4, 3),
('Loft Moderno', 'Calle Gran Vía 12', 1, 1),
('Piso Erasmus', 'Calle Universidad 8', 4, 1),
('Casa Familiar', 'Calle Luna 33', 3, 2),
('Estudio Playa', 'Paseo Marítimo 10', 1, 4),
('Ático Vistas', 'Plaza España 2', 2, 5),
('Piso Compartido', 'Calle Cervantes 15', 3, 1),
('Residencia', 'Avenida Campus 100', 10, 1);

--Miembros (Asignando usuarios a pisos)
INSERT INTO HouseMembers (id_house, id_user) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(3, 6),
(3, 7),
(4, 8),
(5, 9),
(5, 10);

-- Tareas
INSERT INTO Tasks (name, description, state, expiration_date, id_house, id_user) VALUES
('Limpiar cocina', 'Fregar platos y encimera', 'pending', '2026-05-01', 1, 1),
('Bajar basura', 'Reciclar cartón y plástico', 'completed', '2026-04-25', 1, 2),
('Comprar papel higiénico', 'Comprar pack de 24', 'in_progress', '2026-04-30', 1, 3),
('Limpiar baños', 'Usar lejía en los dos baños', 'pending', '2026-05-02', 2, 4),
('Pagar internet', 'Pagar recibo mensual', 'completed', '2026-04-20', 2, 5),
('Regar plantas', 'Las del balcón y salón', 'pending', '2026-05-03', 3, 6),
('Fregar suelos', 'Todo el piso', 'in_progress', '2026-05-01', 3, 7),
('Limpiar cristales', 'Ventanas del salón', 'pending', '2026-05-05', 4, 8),
('Organizar fiesta', 'Comprar bebidas y snacks', 'pending', '2026-05-10', 5, 9),
('Lavar cortinas', 'Lavadora a 30 grados', 'completed', '2026-04-15', 5, 10);

-- Gastos
INSERT INTO Expenses (amount, description, date, id_user, id_house) VALUES
(45.50, 'Compra Mercadona', '2026-04-20', 1, 1),
(15.20, 'Productos de limpieza', '2026-04-22', 2, 1),
(60.00, 'Factura Luz', '2026-04-25', 3, 1),
(35.00, 'Internet', '2026-04-10', 4, 2),
(120.00, 'Compra Carrefour mensual', '2026-04-15', 5, 2),
(85.30, 'Cena compartida', '2026-04-18', 6, 3),
(25.00, 'Netflix y Spotify', '2026-04-05', 7, 3),
(150.00, 'Mueble IKEA', '2026-04-12', 8, 4),
(90.00, 'Factura Agua y Luz', '2026-04-28', 9, 5),
(20.50, 'Cervezas y snacks', '2026-04-27', 10, 5);
