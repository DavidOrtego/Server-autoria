-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS vives_db;
USE vives_db;

-- 1. TABLA: Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'miembro') DEFAULT 'miembro',
    foto VARCHAR(255)