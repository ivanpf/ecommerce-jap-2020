const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
const RESULTADO_DE_BUSQUEDA = document.querySelector('#cat-list-container');
let busqueda = document.querySelector('#buscador');

function buscarCategorias() {
    RESULTADO_DE_BUSQUEDA.innerHTML = '';
    const DATO = busqueda.value.toLowerCase();
    let nombre, descripcion;
    for (let category of currentCategoriesArray) {
        nombre = category.name.toLowerCase();
        descripcion = category.description.toLowerCase();
        if (nombre.indexOf(DATO) !== -1 || descripcion.indexOf(DATO) !== -1) {
            RESULTADO_DE_BUSQUEDA.innerHTML += `
                <div class="card mb-4" style="max-width: 350px;">
                    <img src="${category.imgSrc}" class="card-img-top w-100" alt="Foto del producto">
                    <div class="card-body">
                        <div class="row justify-content-center mb-1">
                            <h5 class="card-title my-auto mr-1">${category.name}</h5>
                            <p class="my-auto text-muted">(cant. ${category.productCount})</p>
                        </div>
                        <div style="min-height: 70px;">
                            <p class="card-text text-center">${category.description}</p>
                        <div class="row justify-content-center">
                            <a href="product-info.html" class="btn btn-primary" style="width: 100px;">Ver</a>
                        </div>
                    </div>
                </div>
            `
        }
    }
}

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

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

function showCategoriesList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) {

            htmlContentToAppend += `
                <div class="card mb-4" style="max-width: 350px;">
                    <img src="${category.imgSrc}" class="card-img-top w-100" alt="Foto del producto">
                    <div class="card-body">
                        <div class="row justify-content-center mb-1">
                            <h5 class="card-title my-auto mr-1">${category.name}</h5>
                            <p class="my-auto text-muted">(cant. ${category.productCount})</p>
                        </div>
                        <divstyle="min-height: 70px;">
                            <p class="card-text text-center">${category.description}</p>
                        <div class="row justify-content-center">
                            <a href="product-info.html" class="btn btn-primary" style="width: 100px;">Ver</a>
                        </div>
                    </div>
                </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showCategoriesList();
    });
    document.getElementById('buscador').addEventListener('input', buscarCategorias);
});