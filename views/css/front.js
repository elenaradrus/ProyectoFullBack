fetch('/login')
    .then(res => res.json())
    .then(json => console.log(json));

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
