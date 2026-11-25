-- =============================================================
-- Datos iniciales de demostracion (idempotente)
-- Inserta solo los productos que aun no existen por (nombre, categoria)
-- sin necesidad de agregar columnas ni restricciones artificiales al modelo.
-- =============================================================

INSERT INTO productos (nombre, categoria, precio, stock, descripcion)
SELECT v.nombre, v.categoria, v.precio, v.stock, v.descripcion
FROM (
    VALUES
        ('RTX 4070', 'Placa de Video', 850000.00::NUMERIC(12,2), 5, 'Placa de video NVIDIA RTX 4070 12GB'),
        ('Ryzen 7 7800X', 'Procesador', 620000.00::NUMERIC(12,2), 8, 'Procesador AMD Ryzen 7'),
        ('Corsair Vengeance 16GB', 'Memoria RAM', 120000.00::NUMERIC(12,2), 15, 'DDR5 6000MHz'),
        ('MSI B650M', 'Placa Madre', 210000.00::NUMERIC(12,2), 7, 'Motherboard AM5 MSI'),
        ('SSD Kingston 1TB', 'Almacenamiento', 95000.00::NUMERIC(12,2), 20, 'Disco SSD NVMe'),
        ('Fuente Corsair 750W', 'Fuente', 145000.00::NUMERIC(12,2), 10, 'Fuente certificada 80 Plus'),
        ('Gabinete NZXT H5', 'Gabinete', 180000.00::NUMERIC(12,2), 4, 'Gabinete gamer'),
        ('Monitor Samsung 27', 'Monitor', 320000.00::NUMERIC(12,2), 6, 'Monitor 144Hz'),
        ('Teclado Redragon', 'Periférico', 45000.00::NUMERIC(12,2), 25, 'Teclado mecánico RGB'),
        ('Mouse Logitech G203', 'Periférico', 35000.00::NUMERIC(12,2), 30, 'Mouse gamer RGB')
) AS v(nombre, categoria, precio, stock, descripcion)
WHERE NOT EXISTS (
    SELECT 1
    FROM productos p
    WHERE p.nombre = v.nombre
      AND p.categoria = v.categoria
);

