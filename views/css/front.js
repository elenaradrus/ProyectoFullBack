
/**
* Validacion de formulario de registro en frontend
*/
const formUser = document.querySelector('#name');
const formLast = document.querySelector('#surname');
const formDni = document.querySelector('#dni');
const formPhone = document.querySelector('#phone');
const formEmail = document.querySelector('#email');
const formPass = document.querySelector('#pass');
const formPassConfirmation = document.querySelector('#passConf');
// regular expressions
const userExp = new RegExp(/^([A-Za-z]{1,15})$/);
const emailExp = new RegExp(/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
const unNameExp = new RegExp(/^([A-Za-z]{1,15})$/);
const telfExp = new RegExp(/^\d{9}$/);
const dniExp = new RegExp(/^\d{8}[a-zA-Z]$/);

const checkPassFormat = (pass) => {
  if (pass.length < 8)
    return 'La contraseña debe tener al menos 8 caracteres.';

  if (pass.length > 15)
    return 'La contraseña no debe exceder los 15 caracteres.';

  // comprobar la contraseña tiene una letra mayúscula
  if (!/[A-Z]/.test(pass))
    return 'La contraseña debe contener al menos una letra mayúscula';

  // comprobar la contraseña tiene una letra minúscula
  if (!/[a-z]/.test(pass))
    return 'La contraseña debe contener al menos una letra mayúscula';

  // comprobar la contraseña tiene un dígito
  if (!/[0-1]/.test(pass))
    return 'La contraseña debe contener al menos un dígito';

  if (/\ /.test(pass))
    return 'La contraseña no puede tener espacios en blanco';

  return '';
}

document.getElementById('botonReg').addEventListener('click', () => {

  // verifica el formato de usuario
  if (!userExp.test(formUser.value)) {
    alert('Usuario no valido'); return;
  }
  if (!unNameExp.test(formLast.value)) {
    alert('Last name no valido'); return;
  }
  if (!dniExp.test(formDni.value)) {
    alert('DNI no valido'); return;
  }
  if (!telfExp.test(formPhone.value)) {
    alert('Telefono no valido'); return;
  }

  // verifica el formato del Email
  if (!emailExp.test(formEmail.value)) {
    alert('Email no valido'); return;
  }


  // verifica el password
  let passCheckMsg = checkPassFormat(formPass.value);
  if (passCheckMsg != '') {
    alert(passCheckMsg); return;
  }

  // comprobar que la contraseña y la confirmación de la contraseña son iguales
  if (formPass.value.localeCompare(formPassConfirmation.value) != 0) {
    alert('El passwords es diferentes'); return;
  }

  // verifique que el correo electrónico y la contraseña sean iguales
  if (formEmail.value.localeCompare(formPass.value) == 0) {
    alert('El correo electrónico y la contraseña no pueden ser iguales'); return;
  }




});



/**
* Ocultar o mostrar el contenedor de registro
*/
document.getElementById('sing').addEventListener('click', () => {
  mostrar(contenedorRegis)
  btnGr1(contLog)
  btnGr2(maxBoxPedir1)
})
document.getElementById('botonTravel').addEventListener('click', () => {
  mostrar1(contLog)
  btnGr(contenedorRegis)
  btnGr2(maxBoxPedir1)
})
document.getElementById('log').addEventListener('click', () => {
  mostrar1(contLog)
  btnGr(contenedorRegis)
  btnGr2(maxBoxPedir1)
})

document.getElementById('btnGr').addEventListener('click', () => {
  btnGr2(maxBoxPedir1)

})


/**
* Funcion para ocultar el contenedor de registro y mostrar el contenedor de login
*/

function mostrar2(id) {
  let test = document.getElementById('maxBoxPedir1');
  if (test.style.display == 'block') {
    test.style.display = 'none';
  } else {
    test.style.display = 'block'
  }
}
function mostrar(id) {
  let test = document.getElementById('contenedorRegis');
  if (test.style.display == 'block') {
    test.style.display = 'none';
  } else {
    test.style.display = 'block'
  }
}
function mostrar1(id) {
  let test = document.getElementById('contLog');
  if (test.style.display == 'block') {
    test.style.display = 'none';
  } else {
    test.style.display = 'block'
  }
}


function btnGr(id) {
  let test = document.getElementById('contenedorRegis');
  if (test.style.display == 'inline') {
    test.style.display = 'block';
  } else {
    test.style.display = 'none'
  }
}
function btnGr2(id) {
  let test = document.getElementById('maxBoxPedir1');
  if (test.style.display == 'inline') {
    test.style.display = 'block';
  } else {
    test.style.display = 'none'
  }
}
function btnGr1(id) {
  let test = document.getElementById('contLog');
  if (test.style.display == 'inline') {
    test.style.display = 'block';
  } else {
    test.style.display = 'none'
  }
}




/**
* enviamos el valor del input a la base de datos
*/

document.getElementById('search1').addEventListener('click', () => {
  if (document.getElementById('search').value == '') {
    alert('No has introducido nada');
  }else{
    document.getElementById('search1').addEventListener('click', () => {
      mostrar2(maxBoxPedir1)
      btnGr(contenedorRegis)
      btnGr1(contLog)
    
    })
    const userInput = document.getElementById('search').value;
    console.log(userInput);
    let data = { userInput }
    fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
  
  
    })
  }
    
  
  
})



/**
* Mapa de google
*/

let latCuber = localStorage.getItem('latitud')
let lngCuber = localStorage.getItem('longitud')
console.log(latCuber)
console.log(lngCuber)

// Acceder a la ubicacion del usuario
navigator.geolocation.getCurrentPosition(function (position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // llamamos al mapa, con vision de las cordenadas elegidas por nosotros y el zomm
  var map = L.map('map').setView([41.390205, 2.154007], 13);
  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }); osm.addTo(map);

  // marcador de coche
  var taxiIcon = L.icon({
    iconUrl: 'pngegg.png',
    iconSize: [70, 70]
  })

  // donde colocamos el cohe
  var marker = L.marker([latitude, longitude], { icon: taxiIcon }).addTo(map);

  // cuando hacemos click sobre el mapa ponemos un nuevo marcador y creamos la ruta
  var newMarker = L.marker([latCuber, lngCuber]).addTo(map);
  L.Routing.control({
    waypoints: [
      L.latLng(41.390205, 2.154007),
      L.latLng(latCuber, lngCuber)
    ]
  }).on('routesfound', function (e) {

    var routes = e.routes;
    console.log(routes);



    // Obtener distancia
    e.routes[0].coordinates.forEach(function (coord, index) {
      setTimeout(function () {
        marker.setLatLng([coord.lat, coord.lng]);
      }, 1500 * index)
    })

  }).addTo(map);
});

