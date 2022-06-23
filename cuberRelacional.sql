#DROP DATABASE cuberRelacional;


CREATE DATABASE cuberRelacional;

USE cuberRelacional;


CREATE TABLE Usuarios (
id INT AUTO_INCREMENT,
nombre VARCHAR(300) NOT NULL,
apellido VARCHAR(300) NOT NULL,
dni CHAR(9) UNIQUE NOT NULL,
email VARCHAR(300),
telefono VARCHAR(15),
contrasena VARCHAR(300) NOT NULL,
PRIMARY KEY(id)
);

SELECT * FROM Usuarios;




CREATE TABLE Coches(
id INT AUTO_INCREMENT,
nombre VARCHAR(300) NOT NULL,
matricula VARCHAR(300) NOT NULL,
telefono VARCHAR(15) NOT NULL,
PRIMARY KEY(id)
);   

SELECT * FROM Coches;

INSERT INTO Coches VALUES(null, "Juan", "3546FGR", "604839578");
INSERT INTO Coches VALUES(null, "Victor", "7364DFA", "627485909");
INSERT INTO Coches VALUES(null, "Sandra", "2809SKF", "690073689");
INSERT INTO Coches VALUES(null, "Amanda", "7483CGB", "688900378");
INSERT INTO Coches VALUES(null, "Jose", "7483AHD", "687125546");
INSERT INTO Coches VALUES(null, "David", "0937FRK", "644567099");
INSERT INTO Coches VALUES(null, "Susana", "5017VTQ", "690788920");
INSERT INTO Coches VALUES(null, "Miguel", "6389DFT", "626670022");
INSERT INTO Coches VALUES(null, "Sebastian", "9263CVR", "643889201");
INSERT INTO Coches VALUES(null, "Lourdes", "2748SDF", "623749899");


CREATE TABLE Pedidos(
id INT AUTO_INCREMENT,
Npedido VARCHAR(300),
fk_id_coche INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_coche) REFERENCES Coches(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Usuarios_Pedidos(
id INT AUTO_INCREMENT,
fk_id_usuario INT NOT NULL,
fk_id_pedido INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_pedido) REFERENCES Pedidos(id) ON UPDATE CASCADE ON DELETE CASCADE
);


#DROP table Administrador;

CREATE TABLE Administrador(
id INT AUTO_INCREMENT,
nombre VARCHAR(300) NOT NULL,
apellido VARCHAR(300) NOT NULL,
dni CHAR(9) UNIQUE NOT NULL,
email VARCHAR(300) NOT NULL,
telefono VARCHAR(15),
contrasena VARCHAR(300) NOT NULL,
PRIMARY KEY(id)
);    

INSERT INTO Administrador VALUES(null, "Mihai", "Mardale", "75154337X", "admin@admin.com", "640404040", "$2b$10$W7s5WuNHzg9uY4I/bNkERe60qsmHmSlwVosIER26qePio4o877Skm");

select * from Administrador;

CREATE TABLE Administrador_Pedidos(
id INT AUTO_INCREMENT,
fk_id_administrador INT NOT NULL,
fk_id_pedido INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_Administrador) REFERENCES Administrador(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_pedido) REFERENCES Pedidos(id) ON UPDATE CASCADE ON DELETE CASCADE
);

    
    
    
    
    



INSERT INTO Usuarios VALUES(null, "Mihai", "Mardale", "75154337X", "admin@admin.com", "640404040", "Admin123*");