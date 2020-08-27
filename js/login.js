//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("boton").addEventListener("onclick", function () {
        sessionStorage.setItem("usuario", document.getElementById("usuario").value);
        sessionStorage.setItem("contrasenia", document.getElementById("contrasenia").value)
    });

    // if (sessionStorage.getItem('usuario')) {
    //     location.href = 'inicio.html';
    // }
    // document.getElementById("formulario").addEventListener("submit", function () {
    //     let user = document.querySelector('#usuario').value;
    //     sessionStorage.setItem('usuario', user);
    //     let pass = document.querySelector('#contrasenia').value;
    //     sessionStorage.setItem('contrasenia', pass);
    // });
});