const CATEGORIES_URL = "http://localhost:3000/categorias"; //"https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/producto-publicado"; //"https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "http://localhost:3000/categoria-info"; //"https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "http://localhost:3000/productos"; //"https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "http://localhost:3000/producto-info"; //"https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/producto-info-comentarios"; //"https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "http://localhost:3000/carrito-info"; //"https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "http://localhost:3000/carrito-compra"; //"https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

function cerrarSesion() {
  if (sessionStorage.getItem("usuario")) {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("contrasenia");
    window.location.href = "login.html";
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  var loc = window.location.pathname;
  var dir = loc.substring(loc.length, loc.lastIndexOf('/'));
  if (sessionStorage.getItem("usuario")) {
    if (localStorage.getItem("usuario")) {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (sessionStorage.getItem("usuario") == usuario.username) {
        if (usuario.imagen != "") {
          document.getElementById("ImagenDropdown").setAttribute("src", usuario.imagen);
        }
      }
    } else if (sessionStorage.getItem("googleImage")) {
      document.getElementById("ImagenDropdown").setAttribute("src", sessionStorage.getItem("googleImage"));
    }
    document.getElementById("dropdownMenuButton").innerHTML = sessionStorage.getItem("usuario");
  } else {
    if (dir != "/login.html") {
      window.location.href = "login.html"
    }
  }
});