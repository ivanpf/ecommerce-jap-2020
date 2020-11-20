//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("boton").addEventListener("click", function () {
        sessionStorage.setItem("usuario", document.getElementById("usuario").value);
        sessionStorage.setItem("contrasenia", document.getElementById("contrasenia").value)
    });
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    sessionStorage.setItem("usuario", profile.getName());
    sessionStorage.setItem("googleImage", profile.getImageUrl());
    window.location.href = "/index.html"
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // var id_token = googleUser.getAuthResponse().id_token;
}