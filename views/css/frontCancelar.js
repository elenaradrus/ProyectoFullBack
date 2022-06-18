
//TODO                               integracion de mapa y posicion
//  import {ubi} from './frontU';

// console.log(ubi);

let latCuber = localStorage.getItem('latitud')
let lngCuber = localStorage.getItem('longitud')
console.log(latCuber)
console.log(lngCuber)

// Acceder a la ubicacion del usuario
navigator.geolocation.getCurrentPosition(function(position){
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

// llamamos al mapa, con vision de las cordenadas elegidas por nosotros y el zomm
var map = L.map('map').setView([41.390205, 2.154007], 13);
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});osm.addTo(map);
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

e.routes[0].coordinates.forEach(function (coord, index) {
setTimeout(function () {
marker.setLatLng([coord.lat, coord.lng]);
}, 1500 * index)
})

}).addTo(map);
});



//TODO                              FIN integracion de mapa y posicion

