/**
 * @author Julian Osorio
 */

/**
 * Llamamos a las librerias de mongoose y sql
 */
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
const mongoose = require("mongoose");
const UserModel = require("../models/userModels");


const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');

const fs = require('fs');
const doc = new PDFDocument();

const connection = require("../database/sqlDataBase");
const mysql = require("mysql");
const { propfind } = require("moongose/routes");

/**
 * Creamos una constante que guarda los valores de los inputs en una funcion
 * para validacion de registro.
 */
const user = {
  saveDataForm: (req, res) => {
    let nombre = req.body.name;
    let apellidos = req.body.surname;
    let email = req.body.email;
    let contrasena = req.body.pass;
    let contrasenaConf = req.body.passConf;
    let telefono = req.body.phone;
    let dni = req.body.dni;
    const emailExp = new RegExp(/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
    const nameExp = new RegExp(/^([A-Za-z]{1,15})$/);
    const unNameExp = new RegExp(/^([A-Za-z]{1,15})$/);
    const telfExp = new RegExp(/^\d{9}$/);
    const dniExp = new RegExp(/^\d{8}[a-zA-Z]$/);
    const passExp = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
    );

    /*let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
     //`SELECT * FROM Usuarios WHERE email = ${loginEmail}`
     let query3 = mysql.format(selectQuery, ["Usuarios", "email", email, "dni", dni]);
     console.log("selectQuery" + selectQuery)
     console.log("query3" + query3)
     connection.query (query3, async (err, data) => {
       if (err) throw err; 
       const emailRepetido = await data[0].email;
       const dniRepetido = await data[0].dni;
       if (email == emailRepetido || dni == dniRepetido) {
         console.log("Usuario ya registrado");
         await res.render("index", { usuarioRegistrado: "Usuario ya registrado" });
       }*/

    /**
     * Aqui comprobamos si los datos que introduce el usuario son correctos o no
     * si lo son se introducen en la base de datos, y si no lo son le indicamos a el usuario que son
     * incorrectos
     */
    if (
      !emailExp.test(email) ||
      !nameExp.test(nombre) ||
      !unNameExp.test(apellidos) ||
      !dniExp.test(dni) ||
      !passExp.test(contrasena) ||
      contrasena != contrasenaConf ||
      !telfExp.test(telefono)
    ) {
      console.log("campos incorrectos"); //renderizar una pagina de campos incorrectos
    } else {
      const mydb = "Cuber";
      const collection = "Historial_Usuario";
      const myobj = {
        Fecha: "18-06-202",
        Recogida: "camp Nou",
        numeroDeTrayecto: "6068716051",
        Hora: "16:00",
        Precio: "20€",
        Dni: req.body.dni,
      };
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);

        dbo.collection(collection).insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("Documento insertado");
          db.close();
        });
      });
      let insertQuery = `INSERT INTO Usuarios
       (
           nombre, apellido, dni ,email, telefono, contrasena
       )
       VALUES
       (
           ?, ?, ?, ?, ?, ?
       )`;

      let query = mysql.format(insertQuery, [
        nombre,
        apellidos,
        dni,
        email,
        telefono,
        contrasena,
      ]);
      console.log(query);
      connection.query(query, (err, data) => {
        if (err) throw err;
        console.log(data);
      });
      res.render("index", {
        usuarioRegistrado: "Usuario registrado correctamente",
      });
    }
    /**
     * Una vez esta registrado, volvemos a el index, y el usuario tiene que volver a logearse.
     */
  },
  registerUser: (req, res) => {
    res.render("index");
  },
  updateUser: (req, res) => { },
  login: (req, res) => {
    loginEmail = req.body.userLog;
    passLog = req.body.passLog;
    /**
     * Aqui comparamos si los datos introducidos por el usuario en el login se encuentran en la base de datos
     * para poder logearse.
     */

    let nameCorrect = `SELECT email,contrasena FROM Usuarios`;

    connection.query(nameCorrect, (err, rows) => {
      if (err) throw err;

      console.log('Usuario: \n', rows);


      for (let i = 0; i < rows.length; i++) {
        if (rows[i].email == loginEmail && rows[i].contrasena == passLog) {
          //res.render("uCuber")
          let selectQuery = "SELECT * FROM ?? WHERE ?? = ?";
          // //`SELECT * FROM Usuarios WHERE email = ${loginEmail}`
          let query3 = mysql.format(selectQuery, [
            "Usuarios",
            "email",
            loginEmail,
          ]);
          console.log("selectQuery" + selectQuery);
          console.log("query3" + query3);
          connection.query(query3, (err, data) => {
            if (err) throw err;
            console.log(data);
            logNombre = data[0].nombre;
            logApellido = data[0].apellido;
            logDni = data[0].dni;
            logEmail = data[0].email;
            logTelefono = data[0].telefono;
          });
          /**
           * En esta funcion buscamos el usuario por su dni en la base de datos de compas
           * y recogemos esos datos en variables que luego pintamos en el render
           */

          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const mydb = "Cuber";
            const collection = "Historial_Usuario";
            var dbo = db.db(mydb);
            var query = { Dni: logDni };
            dbo
              .collection(collection)
              .find(query)
              // .limit(1)
              // .sort({$natural:-1})
              .toArray(function (err, result) {
                if (err) throw err;
                console.log("Encontrado");
                // console.log(result)
                if (result[0]) {
                  fecha = result[0].Fecha;
                  recogida = result[0].Recogida;
                  numtrayeto = result[0].numeroDeTrayecto;
                  hora = result[0].Hora;
                  precio = result[0].Precio;
                  if (result[1]) {
                    fecha1 = result[1].Fecha;
                    recogida1 = result[1].Recogida;
                    numtrayeto1 = result[1].numeroDeTrayecto;
                    hora1 = result[1].Hora;
                    precio1 = result[1].Precio;
                    if (result[2]) {
                      fecha2 = result[2].Fecha;
                      recogida2 = result[2].Recogida;
                      numtrayeto2 = result[2].numeroDeTrayecto;
                      hora2 = result[2].Hora;
                      precio2 = result[2].Precio;
                      console.log('resultado3')
                      res.render("uCuber", {
                        fecha2,
                        recogida2,
                        numtrayeto2,
                        hora2,
                        precio2,
                      });
                    } else {
                      fecha2 = "No hay trayecto";
                      recogida2 = "No hay trayecto";
                      numtrayeto2 = "No hay trayecto";
                      hora2 = "No hay trayecto";
                      precio2 = "No hay trayecto";
                      res.render("uCuber", {
                        fecha2,
                        recogida2,
                        numtrayeto2,
                        hora2,
                        precio2,
                      });
                    }
                    res.render("uCuber", {
                      fecha1,
                      recogida1,
                      numtrayeto1,
                      hora1,
                      precio1,
                    });
                  } else {
                    fecha1 = "No hay trayecto";
                    recogida1 = "No hay trayecto";
                    numtrayeto1 = "No hay trayecto";
                    hora1 = "No hay trayecto";
                    precio1 = "No hay trayecto";
                    res.render("uCuber", {
                      fecha1,
                      recogida1,
                      numtrayeto1,
                      hora1,
                      precio1,
                    });
                  }
                  res.render("uCuber", {
                    fecha,
                    recogida,
                    numtrayeto,
                    hora,
                    precio,
                  });
                } else {
                  fecha = "No hay trayecto";
                  recogida = "No hay trayecto";
                  numtrayeto = "No hay trayecto";
                  hora = "No hay trayecto";
                  precio = "No hay trayecto";
                  // console.log('Error resultado1')
                  res.render("uCuber", {
                    fecha,
                    recogida,
                    numtrayeto,
                    hora,
                    precio,
                  });
                }
                db.close();
              });
          });
        } else {
          // res.render("index", {logError: "Usuario o contraseña incorrectos"})
        }
      }
    });

  },

  uCuber1: (req, res) => {
    res.render("uCuber");
  },
  verCoche: (req, res) => {
    res.render("verCoche");

  },
  logHome: (req, res) => {
    res.render("indexLog");
    // console.log("hola");
    // loginEmail = req.body.userLog;
    // let selectQuery = "SELECT dni FROM ?? WHERE ?? = ?";
    // let query3 = mysql.format(selectQuery, ["Usuarios", "email", loginEmail]);
    // console.log("selectQuery" + selectQuery);
    // console.log("query3" + query3);
    // connection.query(selectQuery, (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    //   //connection.end();
    // });
  },
}
//   record: (req, res) => {

    
// // Create a do
    // }

    // crearPdf();

  // }



module.exports = user;

