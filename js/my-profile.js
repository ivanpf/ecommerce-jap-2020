//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    let usuario;
    if (localStorage.getItem("usuario")) {
        usuario = JSON.parse(localStorage.getItem("usuario"));
        if (sessionStorage.getItem("usuario") == usuario.username) {
            setearCampos(usuario);
        } else {
            document.getElementById("Usuario").value = sessionStorage.getItem("usuario");
        }
    } else {
        document.getElementById("Usuario").value = sessionStorage.getItem("usuario");
    }
    document.getElementById("EditarDatos").addEventListener("click", function () {
        deshabilitarCampos(false);
    })
    document.getElementById("CancelarCambios").addEventListener("click", function () {
        if (localStorage.getItem("usuario")) {
            usuario = JSON.parse(localStorage.getItem("usuario"));
            if (sessionStorage.getItem("usuario") == usuario.username) {
                setearCampos(usuario);
            } else {
                document.getElementById("Usuario").value = sessionStorage.getItem("usuario");
                deshabilitarCampos(true);
            }
        }
    })
    document.getElementById("GuardarDatos").addEventListener("click", function () {
        guardarDatos();
    })
});

function guardarDatos() {
    let camposCompletos = true;
    const nombres = document.getElementById("Nombres");
    const apellidos = document.getElementById("Apellidos");
    const user = document.getElementById("Usuario");
    const tel = document.getElementById("Tel");
    const email = document.getElementById("Email");
    const fechaNac = document.getElementById("FechaNac");
    const imagenURL = document.getElementById("ImagenURL");
    const alerta = document.getElementById("Alert");
    if (nombres.value == "") {
        camposCompletos = camposCompletos && false
    } else {
        camposCompletos = camposCompletos && true;
    }
    if (apellidos.value == "") {
        camposCompletos = camposCompletos && false
    } else {
        camposCompletos = camposCompletos && true;
    }
    if (user.value == "") {
        camposCompletos = camposCompletos && false
    } else {
        camposCompletos = camposCompletos && true;
    }
    if (tel.value == "") {
        camposCompletos = camposCompletos && false
    } else {
        camposCompletos = camposCompletos && true;
    }
    if (email.value == "") {
        camposCompletos = camposCompletos && false
    } else {
        camposCompletos = camposCompletos && true;
    }
    if (fechaNac.value == "") {
        camposCompletos = camposCompletos && false
    } else {
        camposCompletos = camposCompletos && true;
    }
    if (!camposCompletos) {
        alerta.innerHTML = "Aún hay campos por completar.";
        alerta.classList.remove("d-none");
        alerta.classList.add("d-block")
        setTimeout(function () {
            alerta.classList.remove("d-block");
        }, 7000);
        deshabilitarCampos(false);
    } else {
        let usuarioStorage;
        if (imagenURL.value != "") {
            usuarioStorage = {
                nombres: nombres.value,
                apellidos: apellidos.value,
                username: user.value,
                telefono: tel.value,
                email: email.value,
                nacimiento: fechaNac.value,
                imagen: imagenURL.value
            }
            document.getElementById("ImagenDePerfil").setAttribute("src", imagenURL.value);
            document.getElementById("ImagenDropdown").setAttribute("src", imagenURL.value);
        } else {
            usuarioStorage = {
                nombres: nombres.value,
                apellidos: apellidos.value,
                username: user.value,
                telefono: tel.value,
                email: email.value,
                nacimiento: fechaNac.value,
                imagen: ""
            }
            document.getElementById("ImagenDePerfil").setAttribute("src", "img/perfil_no_logueado.jpg");
            document.getElementById("ImagenDropdown").setAttribute("src", "img/perfil_no_logueado.jpg");
        }
        localStorage.setItem("usuario", JSON.stringify(usuarioStorage));
        deshabilitarCampos(true);
    }
}

function deshabilitarCampos(valor) {
    document.getElementById("Nombres").readOnly = valor;
    document.getElementById("Apellidos").readOnly = valor;
    document.getElementById("Usuario").readOnly = valor;
    document.getElementById("Tel").readOnly = valor;
    document.getElementById("Email").readOnly = valor;
    document.getElementById("FechaNac").readOnly = valor;
    document.getElementById("ImagenURL").readOnly = valor;
    if (valor) {
        document.getElementById("CancelarCambios").classList.add("d-none");
        document.getElementById("GuardarDatos").classList.add("d-none");
    } else {
        document.getElementById("CancelarCambios").classList.remove("d-none");
        document.getElementById("GuardarDatos").classList.remove("d-none");
    }
}

function setearCampos(usuario) {
    document.getElementById("Nombres").value = usuario.nombres;
    document.getElementById("Apellidos").value = usuario.apellidos;
    document.getElementById("Usuario").value = usuario.username;
    document.getElementById("Tel").value = usuario.telefono;
    document.getElementById("Email").value = usuario.email;
    document.getElementById("FechaNac").value = usuario.nacimiento;
    if (usuario.imagen != "") {
        document.getElementById("ImagenURL").value = usuario.imagen;
        document.getElementById("ImagenDePerfil").setAttribute("src", usuario.imagen);
        document.getElementById("ImagenDropdown").setAttribute("src", usuario.imagen);
    }
    deshabilitarCampos(true);
}