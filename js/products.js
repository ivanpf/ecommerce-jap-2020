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
    for (let product of currentProductsArray) {
        nombre = product.name.toLowerCase();
        descripcion = product.description.toLowerCase();
        if ((nombre.indexOf(DATO) !== -1 || descripcion.indexOf(DATO) !== -1)) {
            RESULTADO_DE_BUSQUEDA.innerHTML += `
            <div class="card mb-4 " style="max-width: 350px;">
                <img src="${product.imgSrc}" class="card-img-top w-100" alt="Foto del producto">
                <div class="card-body">
                    <h5 class="card-title text-center">${product.name}</h5>
                    <div style="min-height: 80px;">
                        <p class="card-text text-center">${product.description}</p>
                    </div>
                    <h5 class="font-weight-bolder text-center mb-3">U$D ${product.cost}</h5>
                    <div class="row justify-content-around">
                        <a href="product-info.html" class="btn btn-primary col-4">Ver</a>
                    </div>
                </div>
            </div>
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
                <div class="card mb-4 " style="max-width: 350px;">
                    <img src="${product.imgSrc}" class="card-img-top w-100" alt="Foto del producto">
                    <div class="card-body">
                        <h5 class="card-title text-center">${product.name}</h5>
                        <div style="min-height: 80px;">
                            <p class="card-text text-center">${product.description}</p>
                        </div>
                        <h5 class="font-weight-bolder text-center mb-3">U$D ${product.cost}</h5>
                        <div class="row justify-content-around">
                            <a href="product-info.html" class="btn btn-primary col-4">Ver</a>
                        </div>
                    </div>
                </div>
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
    //Muestro los productos ordenados
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
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio de productos
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