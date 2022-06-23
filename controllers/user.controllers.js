/**
 * @author Julian Osorio
 * @author Javier García-Rojo
 * @author Alberto Lara
 * @author Elena Radu
 */

/**
 * Llamamos a las librerias de mongoose y sql
 */
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const mongoose = require("mongoose");
const UserModel = require("../models/userModels");

const PDFDocument = require('pdfkit');

const connection = require("../database/sqlDataBase");
const mysql = require("mysql");
const { propfind } = require("moongose/routes");
const bcrypt = require("bcrypt");








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
      // const mydb = "Cuber";
      // const collection = "Historial_Usuario";
      // const myobj = {
      //   Fecha: "No hay trayecto",
      //   Recogida: "No hay trayecto",
      //   numeroDeTrayecto: "No hay trayecto",
      //   Hora: "No hay trayecto",
      //   Precio: "No hay trayecto",
      //   Dni: req.body.dni,
      // };
      // MongoClient.connect(url, function (err, db) {
      //   if (err) throw err;
      //   var dbo = db.db(mydb);

      //   dbo.collection(collection).insertOne(myobj, function (err, res) {
      //     if (err) throw err;
      //     console.log("Documento insertado");
      //     db.close();
      //   });
      // });

      bcrypt.hash(contrasena, 10, (err, palabraSecretaEncriptada) => {
        if (err) {
          console.log("Error hasheando:", err);
        } else {
          console.log("Y hasheada es: " + palabraSecretaEncriptada);
          palabraEncriptada = palabraSecretaEncriptada;
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
            palabraEncriptada
          ]);
          connection.query(query, (err, data) => {
            if (err) throw err;
            console.log(data);
          });
        }

      });
     let obj = { dni: req.body.dni }

      res.render("index", {
        dni: [obj]
        // usuarioRegistrado: "Usuario registrado correctamente",
    })
    /**
     * Una vez esta registrado, volvemos a el index, y el usuario tiene que volver a logearse.
    */
  }
  },
  registerUser: (req, res) => {
    res.render("index");
  },
  updateUser: (req, res) => { },
  login: (req, res) => {

    /**
     * Guardamos en variables los inputs del login
     */

    loginEmail = req.body.userLog;
    passLog = req.body.passLog;


    /**
     * Comparamos las variables con el email y contraseña del administrador para que pueda modificar.
     */


    if (loginEmail == "admin@admin.com" && passLog == "Admin123*") {
      res.render("admin");
    }


    /**
     * Aqui comparamos si los datos introducidos por el usuario en el login se encuentran en la base de datos
     * para poder logearse.
     */

    let nameCorrect = `SELECT email,contrasena FROM Usuarios where email = '${loginEmail}'`;

    connection.query(nameCorrect, (err, rows) => {
      if (err) throw err;

      console.log('Usuario: \n', rows);
      bcrypt.compare(passLog, rows[0].contrasena).then(function (result) {
        // result == true
        if (result && rows[0].email == loginEmail) {
          console.log("Usuario correcto");
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
                      })
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
                  console.log('Error resultado1')

                  fecha1 = "No hay trayecto";
                    recogida1 = "No hay trayecto";
                    numtrayeto1 = "No hay trayecto";
                    hora1 = "No hay trayecto";
                    precio1 = "No hay trayecto";
                    
                    fecha2 = "No hay trayecto";
                      recogida2 = "No hay trayecto";
                      numtrayeto2 = "No hay trayecto";
                      hora2 = "No hay trayecto";
                      precio2 = "No hay trayecto";
                      res.render("uCuber", {
                        fecha, 
                        recogida,
                        numtrayeto,
                        hora,
                        precio,
                        fecha1,
                        recogida1,
                        numtrayeto1,
                        hora1,
                        precio1,
                        fecha2,
                        recogida2,
                        numtrayeto2,
                        hora2,
                        precio2,
                      });
                }
                // db.close();
              });
          });
        } else {
          console.log("contraseña incorrecta");
        }
      });
    });

  },

  /**
   * aqui renderizamos la vista de Ucuber 
   */
  uCuber1: (req, res) => {


    res.render("uCuber");
  },
  /**
   * aqui renderizamos la vista de verCoche , generamos aleatoriamente un numero de 1 a 10 
   * entre los conductores que tenemos en plantilla por su id, una vez tengamos el numero buscamos
   * ese id en la base de datos para pintar el conductor que va a realizar el viaje
   */
  verCoche: (req, res) => {

    console.log('first')

const data = Math.round(Math.random() * 10);
    console.log(data);

    let query = `SELECT * from Coches WHERE id = ${data}`;
    connection.query(query, (err, rows) => {
      if (err) throw err;
      console.log('Datos de Coches: \n', rows);
      carName = rows[0].nombre
      carNum = rows[0].matricula
      carTelf = rows[0].telefono
      console.log(carName);
      console.log(carNum);
      console.log(carTelf);
      res.render("verCoche", { carName, carNum, carTelf });
      //connection.end();
    });

  },
  
  /**
 * Aqui creamos una funcion que nos permitira crear un usuario en la base de datos de mongo
 */
  factura: async (req, res) => {
    const myobj = {

      Fecha: req.body.fecha,
      Recogida: req.body.direccion,
      numeroDeTrayecto: req.body.traking,
      Hora: req.body.hora,
      Precio: "20€",
      Dni: req.body.dni,
      latitud: req.body.latitud,
      longitud: req.body.longitud,
    }
    /**
    * Insertar dentro de una coleccion de una BD
    */

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      const mydb = "Cuber";
      const collection = "Historial_Usuario";
      var dbo = db.db(mydb);

      dbo.collection(collection).insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Documento insertado");
        db.close();
      });
    });

  },
  /**
* Buscamos por DNI dentro de la base de datos de compas y lo pintamos en el PDF
*/
  genFactura: (req, res) => {
    setTimeout(() => {
      try {
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          const mydb = "Cuber";
          const collection = "Historial_Usuario";
          var dbo = db.db(mydb);
          dbo
            .collection(collection)
            .find({})
            .limit(1)
            .sort({ $natural: -1 })
            .toArray(function (err, result) {
              if (err) throw err;



              const doc = new PDFDocument({ bufferPages: true });
              const filename = `Factura${Date.now()}.pdf`;

              const stream = res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment;filename="${filename}`
              });
              doc.on('data', (data) => { stream.write(data) });
              doc.on('end', () => { stream.end() });

              doc.image('views/css/logo.png', 360, 20, { width: 150 });

              doc.text('Factura CUBER', 30, 70);
              doc.text('Fecha de servicio:   ' + result[0].Fecha, 30, 170);
              doc.text('Hora de servicio:   ' + result[0].Hora, 30, 195);
              doc.text('Recogida en:   ' + result[0].Recogida, 30, 220);
              doc.text('Nº de trayecto:   ' + result[0].numeroDeTrayecto, 30, 245);
              doc.text('Precio del servicio:   ' + result[0].Precio, 30, 270);
              doc.text('Forma de pago:  Tarjeta de credito', 30, 370);



              doc.end();
              db.close();
            });
        });
      }
      catch (error) {
        console.log(error)
      }
    }, 1000);


  },
  /**
   * aqui renderizamos la pagina de indexLog
   */
  logHome: (req, res) => {
    res.render("indexLog");
  }, 
  search: (req, res) => {
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const mydb = "Cuber";
        const collection = "Historial_Usuario";
        var dbo = db.db(mydb);
        dbo
          .collection(collection)
          .find({})
          .limit(1)
          .sort({ $natural: -1 })
          .toArray(function (err, result) {
            if (err) throw err;
            console.log(result)

            MongoClient.connect(url, function (err, db) {
              if (err) throw err;
              const mydb = "Cuber";
              const collection = "Historial_Usuario";
              var dbo = db.db(mydb);
              var query = { 'numeroDeTrayecto': req.body.userInput };
              dbo
                .collection(collection)
                .find(query)
                .toArray(function (err, result) {
                  if (err) throw err;
                  console.log(result);


                  // let obj = { dni: req.body.dni }

                  // res.render("index", {
                  //   dni: [obj]
                  // });
                  // console.log(result[0].latitud)
                  let obj = { latidtud: result[0].latitud, longitud: result[0].longitud }
                  console.log(obj)
                  res.render("index", {
                    latLong: [obj]
                    // usuarioRegistrado: "Usuario registrado correctamente",
                  });
                  db.close();
                  })
                })


            });
          });
      }
    catch (error) {
        console.log(error)
      }
    },

    logOut: (req, res) => {
      res.render('index');
    },
    

    borrar1: (req, res) => {
     console.log(req.body.traking)
       
    },

    borrar: (req, res) => {
      res.render('indexLog')
       //Borrar coleccion
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      const mydb = "Cuber";
      const collection = "Historial_Usuario";
      var dbo = db.db(mydb);
      var myquery = { 'numeroDeTrayecto': req.body.traking };
      dbo
      .collection(collection)
      .deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("Documento borrado");
          db.close();
      });
    });
     
    },

}



  module.exports = user;

