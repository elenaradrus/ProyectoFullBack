


// google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    console.log('Id Profile: ' + profile.getId()); 
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 
  console.log('Id Token '+googleUser.getAuthResponse().id_token );
  }


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




  //Mapa1
  //TODO     Pintamos mapas
const mapId = "map";                                       //* Id index del mapa
const initialCoordinates = [41.38662, 2.16627];       //* Cordenadas iniciales (Plaza Sol en Madrid [lat, lng])
const map = L.map(mapId).setView(initialCoordinates, 13);   //* const Map = (Nos inserta el mapa en el div "map").(Centrada en la cordenada inicial, Zoom = 5)


const MAPBOX_API =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";

   // Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN =
"pk.eyJ1IjoiY2Nhc3RpbGxvMDZtYiIsImEiOiJja2k1eXpybXU3em1mMnRsNjNqajJ0YW12In0.aFQJlFDBDQeUpLHT4EiRYg";


L.tileLayer(MAPBOX_API, {
    maxZoom: 20,
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