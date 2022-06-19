
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

    




// function createCard(id, task) {
//     //<div class="card text-white bg-info mb-6  offset-md-4" style="max-width: 20rem;">
//     const principalDiv = document.createElement('div');
//     principalDiv.setAttribute("class", "card bg-light mb-3");
//     principalDiv.style = "max-width: 20rem;";
//     principalDiv.setAttribute("name", id);
//     principalDiv.setAttribute("id", i);
//     //<div class="card-header">Formulario Tareas</div>
//     const headerDiv = document.createElement('div');
//     const contentDiv = document.createTextNode("Id: " + id);
//     headerDiv.setAttribute("class", "card-header");

//     headerDiv.appendChild(contentDiv);
//     principalDiv.appendChild(headerDiv);
//     // <div class="card-body">
//     const bodyDiv = document.createElement('form');
//     bodyDiv.setAttribute("name", "formulario")
//     bodyDiv.setAttribute("class", "formulario")
//     // const pTitle = document.createElement("p");
//     // const pTitleText = document.createTextNode("Title: " + task.title);


//     const pTitleInText = document.createElement("input");
//     pTitleInText.type = "text";
//     pTitleInText.value =  task.title ;
//     // pTitleInText.placeholder = "Modifica Titulo";
//     pTitleInText.setAttribute("name", "tituloTar");
//     pTitleInText.setAttribute("class", "tituloTar");
   


//     // const pTitleIn = document.createTextNode('placeholder' + task.title);
//     const hr = document.createElement('hr');
//     // const pDesc = document.createElement("p");
//     // const pDescText = document.createTextNode("Description: " + task.description);


//     const pDescInText = document.createElement("input");
//     pDescInText.type = "text";
//     pDescInText.value = task.description;
//     // pDescInText.placeholder = "Modifica Descripción";
//     pDescInText.setAttribute("name", "descriptionTar");
//     pDescInText.setAttribute("class", "descriptionTar");
  


   
//     bodyDiv.appendChild(pTitleInText);
//     bodyDiv.appendChild(hr);
  
//     bodyDiv.appendChild(pDescInText);
//     bodyDiv.appendChild(hr);

//     var inputAdd = document.createElement('input');
//     inputAdd.type = "button";
//     inputAdd.value = "Modificar";
//     inputAdd.setAttribute("name", "añadir");
//     inputAdd.setAttribute("class", "boton");
//     inputAdd.setAttribute("id", id);
//     bodyDiv.appendChild(inputAdd)


//     var input = document.createElement("input");
//     input.type = "button";
//     input.value = "Borrar Tarea";
   
//     input.setAttribute("name", "delete");
//     input.setAttribute("class", "boton");
//     input.setAttribute("id", id);
//     bodyDiv.appendChild(input);

//     principalDiv.appendChild(bodyDiv);

//     let contenedor = document.getElementById('contenedor');
//     contenedor.appendChild(principalDiv)

//     // document.body.appendChild(principalDiv);
//     const br = document.createElement("br");
//     contenedor.appendChild(br);

// }
  

