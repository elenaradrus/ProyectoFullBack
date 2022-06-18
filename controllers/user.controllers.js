/**
 * @author Julian Osorio
 */

/**
 * Llamamos a las librerias de mongoose y sql
 */
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
const mongoose = require("mongoose");
const UserModel = require("../models/userModels");

const connection = require("../database/sqlDataBase")
const mysql = require("mysql")

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
    const passExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);


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
      const myobj = { "Fecha": "", "Salida": "", "Precio": "20€", "Dni": req.body.dni };
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        
        dbo.collection(collection).insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("Documento insertado");
            db.close();
        });
    })
      let insertQuery = `INSERT INTO Usuarios
      (
          nombre, apellido, dni ,email, telefono, contrasena
      )
      VALUES
      (
          ?, ?, ?, ?, ?, ?
      )`;


      let query = mysql.format(insertQuery, [nombre, apellidos, dni, email, telefono, contrasena]);
      console.log(query)
      connection.query(query, (err, data) => {
        if (err) throw err;
        console.log(data);
      });
      res.render("index", { usuarioRegistrado: "Usuario registrado correctamente" });
    }
    /**
     * Una vez esta registrado, volvemos a el index, y el usuario tiene que volver a logearse.
     */
  },
  registerUser: (req, res) => {
    res.render("index");
  },
  updateUser: (req, res) => {

  },
  login: (req, res) => {
    loginEmail = req.body.userLog
    passLog = req.body.passLog
    /**
    * Aqui comparamos si los datos introducidos por el usuario en el login se encuentran en la base de datos
    * para poder logearse.
    */

    let nameCorrect = `SELECT email,contrasena FROM Usuarios`;

    connection.query(nameCorrect, (err, rows) => {
      if (err) throw err;
      console.log('Usuario: \n', rows);

      //res.json(rows);

      //connection.end();
    }
    )
  },
  logHome: (req,res) => {
    res.render("indexLog")
  },
  uCuber1: (req,res) => {
    res.render("uCuber")
  },
  verCoche: (req,res) => {
    res.render("verCoche")
  }

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].email == loginEmail && rows[i].contrasena == passLog) {
          //res.render("uCuber") 
          let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
          // //`SELECT * FROM Usuarios WHERE email = ${loginEmail}`
          let query3 = mysql.format(selectQuery, ["Usuarios", "email", loginEmail]);
          console.log("selectQuery" + selectQuery)
          console.log("query3" + query3)
          connection.query(query3, (err, data) => {
            if (err) throw err;
            console.log(data);
            logNombre = data[0].nombre;
            logApellido = data[0].apellido;
            logDni = data[0].dni;
            logEmail = data[0].email;
            logTelefono = data[0].telefono;
            res.render("uCuber", { logNombre, logApellido, logDni, logEmail, logTelefono });
          })

          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const mydb = "Cuber";
            const collection = "Historial_Usuario";
            var dbo = db.db(mydb);
            var query = { "Dni": logDni };
            dbo.collection(collection).find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("Encontrado");
            console.log("Log dni" + logDni)
            console.log("query" + query)
            db.close();
            });
        });
          
          
           
          

        } else {

          //res.render("index", {logError: "Usuario o contraseña incorrectos"}) 


        }

      }

    });








    //res.render("uCuber")


    //connection.end();


  },
  logHome: (req, res) => {
    console.log("hola");
    // loginEmail = req.body.userLog
    // let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    // let query3 = mysql.format(selectQuery, ["Usuarios", "email", loginEmail]);
    // console.log("selectQuery" + selectQuery)
    // console.log("query3" + query3)
    // connection.query(selectQuery, (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    //   //connection.end();
    // });

  }




}




module.exports = user;


