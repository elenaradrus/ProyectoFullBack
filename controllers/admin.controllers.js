/**
 * traemos las dependencias de sql 
 */
const mysql = require("mysql");
const connection = require("../database/sqlDataBase");

/**
 * guardamos en la constante admin las diferentes funciones (CRUD sql) que vamos a usar para el administrador:
 * borrar(coche y usuario), actualizar, y añadir coche
 */
const admin = {
    anadirCoche: (req, res) => {

        nuevoNombre = req.body.anadirNombre;
        nuevaMatricula = req.body.anadirMatricula;
        nuevoTelefono = req.body.anadirTelefono;
        console.log(nuevoNombre)
        console.log(nuevaMatricula)
        console.log(nuevoTelefono)
        


        //Insertar
        let insertQuery = `INSERT INTO Coches
            (
                nombre, matricula, telefono
            )
            VALUES
            (
                ?, ?, ?
            )`;

        let query = mysql.format(insertQuery, [
            nuevoNombre,
            nuevaMatricula,
            nuevoTelefono
        ]);
        connection.query(query, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.render("admin", {
                nuevoCoche: "Nueva licencia añadida correctamente",
            });
            //connection.end();
        });

    },
    borrarCoche: (req, res) => {
        borrarDato = req.body.borrarCoche;
        let deleteQuery = "DELETE from Coches where matricula = ?";
        let query5 = mysql.format(deleteQuery, borrarDato);

        connection.query(query5, (err, response) => {
            if (err) throw err;
            console.log(response);
            console.log("se ha borrado");
            res.render("admin", {
                nuevoCoche: "Licencia borrada correctamente",
            });
            // console.log(borrarDato);
            //connection.end();
        });
    },
    borrarUsuario: (req, res) => {
        borrarUsuario = req.body.borrarUser;
        let deleteQuery = "DELETE from Usuarios where email = ?";
        let query5 = mysql.format(deleteQuery, borrarUsuario);

        connection.query(query5, (err, response) => {
            if (err) throw err;
            console.log(response);
            console.log("se ha borrado");
            res.render("admin", {
                nuevoCoche: "Conductor borrado correctamente",
            });
            // console.log(borrarDato);
            //connection.end();
        });
    },
    actualizarDatos: (req, res) => {
        const dato1 = req.body.nombreExistente;
        const dato2 = req.body.nombreNuevo;

        let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        let query4 = mysql.format(updateQuery, ["Coches", "nombre", dato2, "nombre", dato1]);

        connection.query(query4, (err, response) => {
            if (err) throw err;
            console.log(response);
            console.log(query4);
            
            //connection.end();
        });

        const dato3 = req.body.telefonoExistente;
        const dato4 = req.body.telefonoNuevo;
        
        let updateQuery1 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        let query1 = mysql.format(updateQuery1, ["Coches", "telefono", dato4, "telefono", dato3]);

        connection.query(query1, (err, response) => {
            if (err) throw err;
            console.log(response);
            console.log(query1);
            //connection.end();
        });

        const dato5 = req.body.matriculaExistente;
        const dato6 = req.body.matriculaNueva;
        
        let updateQuery2 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        let query2 = mysql.format(updateQuery2, ["Coches", "matricula", dato6, "matricula", dato5]);

        connection.query(query2, (err, response) => {
            if (err) throw err;
            console.log(response);
            console.log(query2);
            //connection.end();
            res.render("admin", {
                nuevoCoche: "datos actualizados correctamente",
            });
        });
    },

    logOut: (req, res) => {
        res.render('index');
      }
}


module.exports = admin;