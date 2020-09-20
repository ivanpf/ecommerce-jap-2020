//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            article = resultObj.data.articles;
            // let articleNameHTML = document.getElementById("articleName");
            // let articleDescriptionHTML = document.getElementById("articleDescription");
            // let articleSoldCountHTML = document.getElementById("articleSoldCount");
            // let articleCategoryHTML = document.getElementById("articleCategory");
            // let articleCostHTML = document.getElementById("articleCost");

            // articleNameHTML.innerHTML = article.name;
            // articleDescriptionHTML.innerHTML = article.count;
            // articleSoldCountHTML.innerHTML = article.unitCost;
            // articleCategoryHTML.innerHTML = article.currency;
            // articleCostHTML.innerHTML = article.src;
            mostrarProductoCarrito(article);
        }
    });
});

function mostrarProductoCarrito(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="cart-img-name-cont">
                            <img src="` + product.src + `" class="img-thumbnail cart-item-img">
                            <h5 class="cart-item">` + product.name + `</h5>
                        </div>
                    </div>
                    <div class="col-2">
                        <p class="mb-1 cart-item">` + product.currency + ` ` + product.unitCost + `</p>
                    </div>
                    <div class="col-3">
                        <p class="mb-1 cart-item">` + product.count + `</p>
                    </div>
                    <div class="col-2">
                        <p class="mb-1 cart-item">` + product.currency + ` ` + product.count * product.unitCost + `</p>
                    </div>
                    <div class="col-1">
                        <button>x</button>
                    </div>
                </div>
            </div>
            `
    }
    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
}