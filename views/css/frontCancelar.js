
 /**
 * Integración de Mapas
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
  }).on('routesfound',  function (e) {
   
    var routes = e.routes;
    console.log(routes);


    // Obtener fecha
    let date = new Date();
    console.log(date.toLocaleDateString());
    let fecha = date.toLocaleDateString();
    document.getElementById('outTra1').innerHTML = fecha;

    // Obtener hora
    var currentTime = new Date();

    currentTime.toLocaleTimeString();
    console.log(currentTime.toLocaleTimeString());
    let hora = currentTime.toLocaleTimeString();
    document.getElementById('outTra2').innerHTML = hora;

    // Obtener dirección
    console.log(routes[0].name);
    let direccion = routes[0].name;
    console.log(typeof(direccion));
    document.getElementById('outTra3').innerHTML = direccion;

    // Obtener nºTrayecto
    console.log(uuid.v4());
    let traking = uuid.v4();
    console.log(typeof(traking));
    localStorage.setItem('tracking', traking);
    document.getElementById('outTra').innerHTML = traking;

    // Obtener DNI
    let firstName = localStorage.getItem('Dni');


    //




    const infoHistorial = {
      fecha: fecha,
      hora: hora,
      direccion: direccion,
      traking: traking,
      dni: firstName,
      latitud: latCuber,
      longitud: lngCuber

    }
 // Enviar a la base de datos nada mas cargar la pagina
  fetch('http://localhost:3000/factura', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify(infoHistorial),
})

document.getElementById('botonC').addEventListener('click', function () {
  fetch('http://localhost:3000/borrar', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify({traking}),
})
});

let dniU = localStorage.getItem('Dni');
console.log(dniU)
document.getElementById('uCuber').addEventListener('click', function () {
  fetch('http://localhost:3000/uCuber1', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify({dniU}),
})
});

  



    
    




  // Tiempo en el que se realiza el trayecto
    e.routes[0].coordinates.forEach(function (coord, index) {
      setTimeout(function () {
        marker.setLatLng([coord.lat, coord.lng]);
      }, 1500 * index)





    })

  }).addTo(map);
});



//TODO                              FIN integracion de mapa y posicion








