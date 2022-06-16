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