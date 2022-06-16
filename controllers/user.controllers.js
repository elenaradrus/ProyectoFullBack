const mongoose = require("mongoose");
const UserModel = require("../models/userModels");

const connection = require("../database/sqlDataBase")
const mysql = require("mysql")

const user = {
  saveDataForm: (req, res) => {
    nombre = req.body.name;
    apellidos = req.body.surname;
    email = req.body.email;
    contrasena = req.body.pass;
    contrasenaConf = req.body.passConf;
    telefono = req.body.phone;
    dni = req.body.dni;
    const emailExp = new RegExp(/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
    const nameExp = new RegExp(/^([A-Za-z0-9_]{1,15})$/);
    const unNameExp = new RegExp(/^([A-Za-z0-9_]{1,15})$/);
    const telfExp = new RegExp(/^\d{9}$/);
    const dniExp = new RegExp(/^\d{8}[a-zA-Z]$/);
    const passExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);
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
      res.send(nombre);
    } else {
      let insertQuery = `INSERT INTO Usuarios
      (
          nombre, apellido, dni ,email, telefono, contrasena
      )
      VALUES
      (
          ?, ?, ?, ?, ?, ?
      )`;


let query = mysql.format(insertQuery, [nombre, apellidos, dni, email, telefono, contrasena] );
         console.log(query)
      connection.query(query, (err, data) => {
        if(err) throw err;
        console.log(data);
    }); 
      console.log("todo ok");
    }

   
    

    //regex
    

    //condicion de comprobacion
   
  },
  registerUser: (req, res) => {
    res.render("index");
  },
  updateUser: (req,res) => {

  },
  login : (req, res) => {
    loginName = req.body.userLog
    passLog = req.body.passLog

    console.log("mas o menos");
  }
//'SELECT * FROM ?? WHERE ?? = ?';    



  }
  
let nameCorrect = `SELECT * FROM Usuarios`;
    
connection.query(nameCorrect, (err, rows) => {
  if(err) throw err;
  console.log('Usuario: \n', rows);
  
  //connection.end();
}
)

// module.exports = user.login;
module.exports = user;
