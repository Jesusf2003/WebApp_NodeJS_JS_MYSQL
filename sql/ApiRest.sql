-- Crear tablas

-- Crear tabla artículos
create table articulos(
	id 				int AUTO_INCREMENT,
	descripcion		varchar(100),
	precio			decimal(10,2),
	stock			int,
	primary key (id)
);

-- El autoincrementable se puede especificar en cualquier momento

-- Ver descripción de la tabla
desc articulos;

-- Insertar datos
/*
 * Ya que el campo id es autoincrementable
 * podemos prescindir de agregarlo en
 * la sentencia de Insert
 */
insert into articulos
	(descripcion, precio, stock)
values
	('Harina 000 - 3 KG', 150.00, 50),
	('Fanta Naranja', 86.00, 10),
	('Vino Malbec', 252.00, 42),
	('Azucar - 3 KG', 450.00, 20),
	('Leche entera Sancor', 89.00, 36),
	('Dulce de leche Sancor', 99.00, 50),
	('Queso cremoso', 250.00, 60);

-- Listar datos de las tablas
select * from articulos;