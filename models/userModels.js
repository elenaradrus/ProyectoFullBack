const { app_features } = require("moongose/models");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 


let userSchema= new Schema({
  
    name: {
        firstName: String,
        lastName: String
    }, 
    created: Date, 
    linkedin: {
        type: String,
        validate: {
            validator: function(urlLinkedin){
                return urlLinkedin.indexOf('https://www.linkedin.com/') == 0;
            }, 
            message: "Linkedin Incorrecto"
        }
    }

  
});

 
const usersModel = mongoose.model("users", userSchema);
module.exports = usersModel;*/
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + 'views/index.pug');
// });

// app.post("/", urlencodedParser,(req, res) => {
  // function validar () {
//     var nombre, apellidos, email, contrasena, telefono;
//     nombre = req.body.name;
//     apellidos = req.body.surname;
//     email = req.body.email;
//     contrasena = req.body.pass;
//     contrasenaConf = req.body.passConf;
//     telefono = req.body.phone;
//     dni = req.body.dni;
    
  
    //regex
//     const emailExp = new RegExp(/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
//     const nameExp = new RegExp(/^([A-Za-z0-9_]{1,15})$/);
//     const unNameExp = new RegExp(/^([A-Za-z0-9_]{1,15})$/);
//     const telfExp = new RegExp (/^\d{9}$/);
//     const dniExp = new RegExp(/^\d{8}[a-zA-Z]$/);
//     const passExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);
    
    //condicion de comprobacion
//     if((!emailExp.test(email))||(!nameExp.test(nombre))||(!unNameExp.test(apellidos))||(!dniExp.test(dni))
//     ||(!passExp.test(contrasena))||(!passExp.test(contrasenaConf))||!telfExp.test(telefono)){
//       console.log("campos incorrectos") //renderizar una pagina de campos incorrectos
//     }else{
//       console.log("todo ok")
//     }
  
//     if(contrasena != contrasenaConf){
//       console.log("las contraseñas no coinciden")
//     }else{
//       console.log("todo ok2")
//     }
//     console.log(nombre)
//     db.close();
// })


    