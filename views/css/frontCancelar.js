
//TODO                               integracion de mapa y posicion
//  import {ubi} from './frontU';

// console.log(ubi);

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


    // Obtener fecha
    let date = new Date();
    console.log(date.toLocaleDateString());
    document.getElementById('outTra1').innerHTML = date.toLocaleDateString();

    // Obtener hora
    var currentTime = new Date();

    currentTime.toLocaleTimeString();
    console.log(currentTime.toLocaleTimeString());
    document.getElementById('outTra2').innerHTML = currentTime.toLocaleTimeString();

    // Obtener dirección
    console.log(routes[0].name);
    document.getElementById('outTra3').innerHTML = routes[0].name;

    // Obtener nºTrayecto
    console.log(uuid.v4());
    const traking = uuid.v4();
    document.getElementById('outTra').innerHTML = traking;





    e.routes[0].coordinates.forEach(function (coord, index) {
      setTimeout(function () {
        marker.setLatLng([coord.lat, coord.lng]);
      }, 1500 * index)





    })

  }).addTo(map);
});



//TODO                              FIN integracion de mapa y posicion



document.getElementById('botonF').addEventListener('click', () => {
 
  // var doc = new jsPDF()
  function loadImage(url) {
    return new Promise((resolve) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.src = url;
    })
  }


  loadImage('logo.png').then((logo) => {
    let mierda = document.getElementById('outName').value;
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(40)

    doc.addImage(logo, 'PNG', 100, 10);

    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.setFontSize(22)
    doc.text(20, 20, 'CUBER')

    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.setTextColor(150)
    doc.text(20, 30, 'Live your dreams')


    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text(20, 55, 'nombre:')

    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.setTextColor(150)
    doc.text(20, 55, mierda)




    doc.save('factura.pdf')
  });






})


