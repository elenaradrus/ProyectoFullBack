


navigator.geolocation.getCurrentPosition(function(position){
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var map = L.map('map').setView([41.390205, 2.154007], 13);
mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);

var taxiIcon = L.icon({
iconUrl: 'pngegg.png',
iconSize: [70, 70]
})

var marker = L.marker([latitude, longitude], { icon: taxiIcon }).addTo(map);

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

e.routes[0].coordinates.forEach(function (coord, index) {
setTimeout(function () {
marker.setLatLng([coord.lat, coord.lng]);
}, 500 * index)
})

}).addTo(map);
});

});



  document.getElementById('botonU').addEventListener('click', () =>{
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




  