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


    
CREATE TABLE Coches(
id INT AUTO_INCREMENT,
matricula VARCHAR(300),
PRIMARY KEY(id)
);   

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


CREATE TABLE Administrador(
id INT AUTO_INCREMENT,
nombre VARCHAR(300) NOT NULL,
apellido VARCHAR(300) NOT NULL,
dni CHAR(9) UNIQUE NOT NULL,
email VARCHAR(300),
telefono VARCHAR(15),
direccion VARCHAR(500),
contrasena VARCHAR(300) NOT NULL,
PRIMARY KEY(id)
);    


CREATE TABLE Administrador_Pedidos(
id INT AUTO_INCREMENT,
fk_id_administrador INT NOT NULL,
fk_id_pedido INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_Administrador) REFERENCES Administrador(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_pedido) REFERENCES Pedidos(id) ON UPDATE CASCADE ON DELETE CASCADE
);
    
#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';    

    
    
    
    
    





    
    