//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("boton").addEventListener("click", function () {
        sessionStorage.setItem("usuario", document.getElementById("usuario").value);
        sessionStorage.setItem("contrasenia", document.getElementById("contrasenia").value)
    });
});