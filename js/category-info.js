var category = {};

function showImagesGallery(array) {
    let htmlImageToAppend = "";
    let htmlLiToAppend = "";
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            htmlLiToAppend += `
            <li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>
            `;
            htmlImageToAppend += `
            <div class="carousel-item active">
                <img src="${array[i]}" class="d-block">
            </div>
            `;
        } else {
            htmlLiToAppend += `
            <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>
            `;
            htmlImageToAppend += `
            <div class="carousel-item">
                <img src="${array[i]}" class="d-block">
            </div>
            `;
        }
        document.getElementById("li-carousel-container").innerHTML = htmlLiToAppend;
        document.getElementById("img-carousel-container").innerHTML = htmlImageToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CATEGORY_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data;

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");

            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = "(" + category.productCount + " productos)";
            productCriteriaHTML.innerHTML = category.productCriteria;

            //Muestro las imagenes en forma de carousel
            showImagesGallery(category.images);
        }
    });
});