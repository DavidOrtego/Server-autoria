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

-- TABLA: Tareas
CREATE TABLE IF NOT EXISTS Tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    estado ENUM('pendiente', 'en_progreso', 'completada') DEFAULT 'pendiente',
    fechaLimite DATE,
    id_piso INT NOT NULL,
    id_usuario INT,
    FOREIGN KEY (id_piso) REFERENCES Pisos(id_piso) ON DELETE RESTRICT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL
);

-- TABLA: Gastos
CREATE TABLE IF NOT EXISTS Gastos (
    id_gasto INT AUTO_INCREMENT PRIMARY KEY,
    cantidad DECIMAL(10, 2) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    id_usuario INT NOT NULL, 
    id_piso INT NOT NULL,    
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE RESTRICT,
    FOREIGN KEY (id_piso) REFERENCES Pisos(id_piso) ON DELETE RESTRICT
);

-- TABLA: Deudas
CREATE TABLE IF NOT EXISTS Deudas (
    id_deuda INT AUTO_INCREMENT PRIMARY KEY,
    id_gasto INT NOT NULL,
    id_usuario INT NOT NULL, 
    cantidad DECIMAL(10, 2) NOT NULL, 
    pagado BOOLEAN DEFAULT FALSE,   
    FOREIGN KEY (id_gasto) REFERENCES Gastos(id_gasto) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE RESTRICT
);

-- PROCEDIMIENTO ALMACENADO: Borrar tareas completadas
DELIMITER //

CREATE PROCEDURE LimpiarTareasAntiguas()
BEGIN
    -- Elimina las tareas completadas y su fecha límite pasó hace más de 30 días
    DELETE FROM Tareas 
    WHERE estado = 'completada' 
    AND fechaLimite < DATE_SUB(CURDATE(), INTERVAL 30 DAY);
END //

DELIMITER ;