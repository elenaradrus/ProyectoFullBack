
// form inputs
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

  document.getElementById('botonReg').addEventListener('click', () =>{
    e.preventDefault();
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



  //ver y ocultar
document.getElementById('sing').addEventListener('click', () =>{
    mostrar(contenedorRegis)
    btnGr1(contLog)
})
document.getElementById('botonTravel').addEventListener('click', () =>{
    mostrar1(contLog)
    btnGr(contenedorRegis)
})
document.getElementById('log').addEventListener('click', () =>{
    mostrar1(contLog)
    btnGr(contenedorRegis)
})


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
function btnGr1(id) {
    let test = document.getElementById('contLog');
    if (test.style.display == 'inline') {
        test.style.display = 'block';
    } else {
        test.style.display = 'none'
    }
}


// google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    console.log('Id Profile: ' + profile.getId()); 
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 
  console.log('Id Token '+googleUser.getAuthResponse().id_token );
  }



  //Mapa1
  //TODO     Pintamos mapas
const mapId = "map";                                       //* Id index del mapa
const initialCoordinates = [40.4169473, -3.7057172];       //* Cordenadas iniciales (Plaza Sol en Madrid [lat, lng])
const map = L.map(mapId).setView(initialCoordinates, 5);   //* const Map = (Nos inserta el mapa en el div "map").(Centrada en la cordenada inicial, Zoom = 5)


const MAPBOX_API =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";

   // Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN =
"pk.eyJ1IjoiY2Nhc3RpbGxvMDZtYiIsImEiOiJja2k1eXpybXU3em1mMnRsNjNqajJ0YW12In0.aFQJlFDBDQeUpLHT4EiRYg";
// var myIcon = L.icon({
//     iconUrl:'pngegg.png',
//     iconSize: [38, 95],
//     iconAnchor: [22, 94],
//     popupAnchor: [-3, -76],
//     // shadowUrl: 'my-icon-shadow.png',
//     shadowSize: [68, 95],
//     shadowAnchor: [22, 94]
//     });
    
//     L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

L.tileLayer(MAPBOX_API, {
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN,
  }).addTo(map);

  function searchCity() {
    let city = document.getElementById("cityName").value.toLowerCase();
    fetch("./coordenatesspain.json")
      .then((res) => res.json())
      .then((res) => {
        let coordenatesCity = res.filter((cities) => cities.ciudad == city);
        //* Para gestionar un gran cambio del json.
        let cleanLat = coordenatesCity[0].latitud * 100;
        let cleanLon = coordenatesCity[0].longitud * 100;
        const plazaMayorCoordinates = [cleanLat, cleanLon];
        //* Añadir marcador de la ciudad solicitada en el div.
        L.marker(plazaMayorCoordinates).bindPopup(`${city} : lat:${cleanLat} long: ${cleanLon}`).addTo(map);
      });
    }   
