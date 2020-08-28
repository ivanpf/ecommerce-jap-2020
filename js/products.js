var currentProductsArray = [];
const ORDER_ASC_BY_COST = "aaa";
const ORDER_DESC_BY_COST = "bbb";
const ORDER_DESC_BY_REL = "Relevancia";
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
const RESULTADO_DE_BUSQUEDA = document.querySelector('#prod-list-container');
let busqueda = document.querySelector('#buscador');

function buscarProductos() {
    RESULTADO_DE_BUSQUEDA.innerHTML = '';
    const DATO = busqueda.value.toLowerCase();
    let nombre, descripcion;
    for (let producto of currentProductsArray) {
        nombre = producto.name.toLowerCase();
        descripcion = producto.description.toLowerCase();
        if ((nombre.indexOf(DATO) !== -1 || descripcion.indexOf(DATO) !== -1)) {
            RESULTADO_DE_BUSQUEDA.innerHTML += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + producto.name + `</h4>
                            <small class="text-muted">U$D ` + producto.cost + `</small>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
    }
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if (aCost < bCost) {
                return -1;
            }
            if (aCost > bCost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if (aCost > bCost) {
                return -1;
            }
            if (aCost < bCost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_REL) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if (aCount > bCount) {
                return -1;
            }
            if (aCount < bCount) {
                return 1;
            }
            return 0;
        });
    }
    return result;
}

function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + `</h4>
                            <small class="text-muted">U$D ` + product.cost + `</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCost").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCoStMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }

        showProductsList();
    });

    document.getElementById('buscador').addEventListener('input', buscarProductos);
});