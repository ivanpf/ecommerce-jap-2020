//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = "U$D " + product.cost;
            showImagesGallery(product.images);
            showRelatedProducts(product.relatedProducts);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showComments(resultObj.data);
        }
    });

    document.getElementById("enviar-comment").addEventListener("click", makeComment);
});

function showRelatedProducts(array_related) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let htmlContentToAppend = "";
            for (let i = 0; i < array_related.length; i++) {
                htmlContentToAppend += `
                    <div class="col-md-4 cont-relacionados">
                        <a class="card mb-4 shadow-sm custom-card" href="product-info.html">
                            <img class="bd-placeholder-img card-img-top" src="${resultObj.data[array_related[i]].imgSrc}">
                            <h4 class="m-3"><b>${resultObj.data[array_related[i]].name}</b></h4>
                            <div class="card-body">
                                <p><b>U$D ${resultObj.data[array_related[i]].cost}</b> - ${resultObj.data[array_related[i]].soldCount} vendidos</p>
                            </div>
                        </a>
                    </div>
                `;
            }
            document.getElementById('relatedProductsContainer').innerHTML = htmlContentToAppend;
        }
    });
}

var rating; //variable global que guarda la cantidad de estrellas marcadas para puntuar el nuevo comentario.

function marcarEstrella(star) {
    let count = star.id[0];
    let subid = star.id.substring(1);
    rating = count;
    for (let i = 0; i < 5; i++) {
        if (i < count) {
            document.getElementById((i + 1) + subid).style.color = "orange";
        } else {
            document.getElementById((i + 1) + subid).style.color = "#495057";
        }
    }
}

function makeComment() {
    if (document.getElementById('comment-content').value !== '') {
        if (rating !== 0 && rating !== undefined) {
            let estrellasToAppend = "";
            let htmlContentToAppend = "";
            var fecha = new Date();
            for (let i = 0; i < rating; i++) {
                estrellasToAppend += `
            <span class="fa fa-star checked"></span>
            `;
            }
            for (let i = 0; i < 5 - rating; i++) {
                estrellasToAppend += `
            <span class="fa fa-star"></span>
            `;
            }
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <p id="comment-score">` + estrellasToAppend + `</p>
                <div id="comment-user-cont">
                    <p id="comment-user">` + document.getElementById('dropdownMenuButton').textContent + `</p>
                    <p id="comment-date">` + fecha.getFullYear() + `-` + ("0" + fecha.getMonth()).slice(-2) + `-` + ("0" + fecha.getDay()).slice(-2) + ` ` + ("0" + fecha.getHours()).slice(-2) + `:` + ("0" + fecha.getMinutes()).slice(-2) + `:` + ("0" + fecha.getSeconds()).slice(-2) + `</p>
                </div>
                <p>` + document.getElementById('comment-content').value + `</p>
            </div>
            `;
            estrellasToAppend = "";
            document.getElementById("product-comments").innerHTML += htmlContentToAppend;

            //Una vez hecho el comentario vuelvo los valores a su inicio
            document.getElementById('comment-content').value = '';
            let estrellas = document.getElementsByClassName('star-new-comment')
            rating = 0;
            for (let i = 0; i < estrellas.length; i++) {
                estrellas[i].style.color = "#495057";
            }
        } else {
            alert('Debe seleccionar la puntuación');
        }
    } else {
        alert('Debe escribir un comentario');
    }
}

function showComments(array_comentarios) {
    let estrellasToAppend = "";
    let htmlContentToAppend = "";
    for (let i = 0; i < array_comentarios.length; i++) {
        let comment = array_comentarios[i];
        for (let u = 0; u < comment.score; u++) {
            estrellasToAppend += `
                <span class="fa fa-star checked"></span>
                `;
        }
        for (let u = 0; u < 5 - comment.score; u++) {
            estrellasToAppend += `
                <span class="fa fa-star"></span>
                `;
        }
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <p id="comment-score">` + estrellasToAppend + `</p>
                <div id="comment-user-cont">
                    <p id="comment-user">` + comment.user + `</p>
                    <p id="comment-date">` + comment.dateTime + `</p>
                </div>
                <p>` + comment.description + `</p>
            </div>
            `;
        estrellasToAppend = "";
    }
    document.getElementById("product-comments").innerHTML = htmlContentToAppend;
}

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
                <img src="${array[i]}" class="d-block w-100">
            </div>
            `;
        } else {
            htmlLiToAppend += `
            <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>
            `;
            htmlImageToAppend += `
            <div class="carousel-item">
                <img src="${array[i]}" class="d-block w-100">
            </div>
            `;
        }
        document.getElementById("li-carousel-container").innerHTML = htmlLiToAppend;
        document.getElementById("img-carousel-container").innerHTML = htmlImageToAppend;
    }
}