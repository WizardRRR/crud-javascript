CREATE DATABASE IF NOT EXISTS crud_javascript;
USE crud_javascript;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    age INT,
    color VARCHAR(20),
    photoUri VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP
);

-- Insertar algunos usuarios de ejemplo
INSERT INTO users (name, lastName, age, color, photoUri) VALUES 
('Juan', 'Perez', 25, 'Azul', 'https://example.com/photo1.jpg'),
('Maria', 'Gonzalez', 30, 'Rojo', 'https://example.com/photo2.jpg'),
('Pedro', 'Lopez', 40, 'Verde', 'https://example.com/photo3.jpg'),
('Ana', 'Martinez', 35, 'Amarillo', 'https://example.com/photo4.jpg');
