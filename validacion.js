function validar () {
  var nombre, apellidos, email, contrasena, telefono;
  nombre = document.getElementById("name").value
  apellidos = document.getElementById("apellido").value
  email = document.getElementById("email").value
  contrasena = document.getElementById("passFr").value
  contrasenaConf = document.getElementById("passConf").value
  telefono = document.getElementById("telefono").value
  dni = document.getElementById("dni").value

  //regex
  const emailExp = new RegExp(/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
  const nameExp = new RegExp(/^([A-Za-z0-9_]{1,15})$/);
  const unNameExp = new RegExp(/^([A-Za-z0-9_]{1,15})$/);
  const telfExp = new RegExp (/^\d{9}$/);
  const dniExp = new RegExp(/^\d{8}[a-zA-Z]$/);
  const passExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);
  
  //condicion de comprobacion
  if((!emailExp.test(email))||(!nameExp.test(nombre))||(!unNameExp.test(apellidos))||(!dniExp.test(dni))
  ||(!passExp.test(contrasena))||(!passExp.test(contrasenaConf))||!telfExp.test(telefono)){
    console.log("campos incorrectos") //renderizar una pagina de campos incorrectos
  }else{
    console.log("todo ok")
  }

  if(contrasena != contrasenaConf){
    console.log("las contraseñas no coinciden")
  }else{
    console.log("todo ok2")
  }
}
  

 
