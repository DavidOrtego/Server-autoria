-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS vives_db;
USE vives_db;

-- TABLA: Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'miembro') DEFAULT 'miembro',
    foto VARCHAR(255)
);

-- TABLA: Pisos
CREATE TABLE IF NOT EXISTS Pisos (
    id_piso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    NumeroHabitaciones INT,
    Foto VARCHAR(255),
);

-- TABLA: MiembrosPiso
CREATE TABLE IF NOT EXISTS MiembrosPiso (
    id_membresia INT AUTO_INCREMENT PRIMARY KEY,
    id_piso INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_piso) REFERENCES Pisos(id_piso) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
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
