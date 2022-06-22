


//                     OSM  LAYER               

//TODO       BUsqueda de direccion por input (PROBLEMA!!!! NO CONSEGUIMOS EXPORTAR LA LONG Y LAT)
// var map = L.map('map').setView([41.390205, 2.154007], 12);
// var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });
// osm.addTo(map);


// // MARKER               
// // googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
// //     maxZoom: 20,
// //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// // });
// // googleStreets.addTo(map);
// // console.log(googleStreets)

// // SEARCH BUTTON               
// L.Control.geocoder().addTo(map);

// console.log(map._layers)
// console.log(map)
// // console.log(map[_popup])
// console.log(map["_popup"])
//TODO      FINAL       BUsqueda de direccion por input (PROBLEMA!!!! NO CONSEGUIMOS EXPORTAR LA LONG Y LAT)


//TODO                           Comienzo integracion de mapa y posicion

// Acceder a la ubicacion del usuario
navigator.geolocation.getCurrentPosition(function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
  
  // llamamos al mapa, con vision de las cordenadas elegidas por nosotros y el zomm
    var map = L.map('map').setView([41.390205, 2.154007], 13);
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});osm.addTo(map);
//   mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
//   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);
  
  // marcador de coche
  var taxiIcon = L.icon({
  iconUrl: 'pngegg.png',
  iconSize: [70, 70]
  })
  
  // donde colocamos el cohe
  var marker = L.marker([latitude, longitude], { icon: taxiIcon }).addTo(map);
  
  // cuando hacemos click sobre el mapa ponemos un nuevo marcador y creamos la ruta
  map.on('click', function (e) {
  console.log(e)
  var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  L.Routing.control({
  waypoints: [
  L.latLng(41.390205, 2.154007),
  L.latLng(e.latlng.lat, e.latlng.lng)
  ]
  }).on('routesfound', function (e) {
  var routes = e.routes;
  console.log(routes);
  
  console.log(routes[0].inputWaypoints[1].latLng);
  localStorage.setItem('latitud', routes[0].inputWaypoints[1].latLng.lat)
  localStorage.setItem('longitud', routes[0].inputWaypoints[1].latLng.lng)
//   export.module =routes

// Obtener fecha
let date = new Date();
console.log(date.toLocaleDateString());

// Obtener hora
var currentTime = new Date();

currentTime.toLocaleTimeString();
console.log(currentTime.toLocaleTimeString());

// Obtener dirección
console.log(routes[0].name);

// Obtener nºTrayecto
// console.log(uuid.v4());
  
const infoHistorial = {
    fecha: fecha,
    hora: hora,
    direccion: direccion,
    traking: traking

  }
//   console.log(infoHistorial);
// Enviar mierda a la base de datos
// const todo = {
// title: 'Some really important work to finish'
// };







    // Obtener distancia
  e.routes[0].coordinates.forEach(function (coord, index) {
  setTimeout(function () {
  marker.setLatLng([coord.lat, coord.lng]);
  }, 1500 * index)
  })
  
  }).addTo(map);
  });
  
  });
  //TODO                              FIN integracion de mapa y posicion






//TODO                              Funciones de ocultar y ver


  document.getElementById('botonTravel').addEventListener('click', () =>{
    mostrar(maxBoxPedir)
   
})
document.getElementById('botonpagarB').addEventListener('click', () =>{

    btnGr(maxBoxPedir)
})

function mostrar(id) {
    let test = document.getElementById('maxBoxPedir');
    if (test.style.display == 'block') {
        test.style.display = 'none';
    } else {
        test.style.display = 'block'
    }
}
function btnGr(id) {
    let test = document.getElementById('maxBoxPedir');
    if (test.style.display == 'inline') {
        test.style.display = 'block';
    } else {
        test.style.display = 'none'
    }
}

//TODO                            FIN  Funciones de ocultar y ver



