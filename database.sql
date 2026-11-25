CREATE DATABASE login_db;

USE login_db;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    descripcion TEXT
);
INSERT INTO productos(nombre,categoria,precio,stock,descripcion)
VALUES
('RTX 4070','Placa de Video',850000,5,'Placa de video NVIDIA RTX 4070 12GB'),
('Ryzen 7 7800X','Procesador',620000,8,'Procesador AMD Ryzen 7'),
('Corsair Vengeance 16GB','Memoria RAM',120000,15,'DDR5 6000MHz'),
('MSI B650M','Placa Madre',210000,7,'Motherboard AM5 MSI'),
('SSD Kingston 1TB','Almacenamiento',95000,20,'Disco SSD NVMe'),
('Fuente Corsair 750W','Fuente',145000,10,'Fuente certificada 80 Plus'),
('Gabinete NZXT H5','Gabinete',180000,4,'Gabinete gamer'),
('Monitor Samsung 27','Monitor',320000,6,'Monitor 144Hz'),
('Teclado Redragon','Periférico',45000,25,'Teclado mecánico RGB'),
('Mouse Logitech G203','Periférico',35000,30,'Mouse gamer RGB');
