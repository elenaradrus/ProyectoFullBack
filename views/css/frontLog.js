
/**
* Integración de Mapas
*/


// Acceder a la ubicacion del usuario
navigator.geolocation.getCurrentPosition(function (position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // llamamos al mapa, con vision de las cordenadas elegidas por nosotros y el zomm
  var map = L.map('map').setView([41.390205, 2.154007], 13);
  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }); osm.addTo(map);

  //TODO------- Esto es otra forma de visualizar el mapa
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







 /**
 * Funcion para mostrar el formulario de pedir coche
 */



document.getElementById('botonTravel').addEventListener('click', () => {
  mostrar(maxBoxPedir)

})
document.getElementById('botonpagarB').addEventListener('click', () => {

  btnGr(maxBoxPedir)
})
document.getElementById('search2').addEventListener('click', () => {
  if (document.getElementById('search').value == '') {
    alert('No has introducido nada');
  }else{
    mostrar2(maxBoxPedir2)
    btnGr(maxBoxPedir)
  }
 

})
document.getElementById('btnGr1').addEventListener('click', () => {
  btnGr2(maxBoxPedir2)

})


/**
* Funcion para ocultar el contenedor de registro y mostrar el contenedor de login
*/
function mostrar2(id) {
  let test = document.getElementById('maxBoxPedir2');
  if (test.style.display == 'block') {
    test.style.display = 'none';
  } else {
    test.style.display = 'block'
  }
}

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
function btnGr2(id) {
  let test = document.getElementById('maxBoxPedir2');
  if (test.style.display == 'inline') {
    test.style.display = 'block';
  } else {
    test.style.display = 'none'
  }
}

//TODO                            FIN  Funciones de ocultar y ver



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
  var map = L.map('map2').setView([41.390205, 2.154007], 13);
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

