//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            article = resultObj.data.articles;
            mostrarProductoCarrito(article);
            document.getElementById("subtotalCostText").innerHTML = "USD " + cartSubTotal(article);
            document.getElementById("totalCostText").innerHTML = "USD " + cartSubTotal(article);
            document.getElementById('comissionText').innerHTML = "USD " + Math.round(cartSubTotal(article) * 0.15);
            radios = document.getElementsByName('deliveryType')
            radios.forEach(radio => {
                radio.addEventListener('click', function () {
                    subtotal = cartSubTotal(article, document.getElementsByClassName("countInput"));
                    document.getElementById("subtotalCostText").innerHTML = "USD " + Math.round(subtotal);
                    if (document.getElementById("premiumRadio").checked) {
                        document.getElementById("comissionText").innerHTML = "USD " + Math.round(subtotal * 0.15);
                        document.getElementById("totalCostText").innerHTML = "USD " + Math.round(subtotal * 1.15);
                    }
                    if (document.getElementById("expressRadio").checked) {
                        document.getElementById("comissionText").innerHTML = "USD " + Math.round(subtotal * 0.07);
                        document.getElementById("totalCostText").innerHTML = "USD " + Math.round(subtotal * 1.07);
                    }
                    if (document.getElementById("standardRadio").checked) {
                        document.getElementById("comissionText").innerHTML = "USD " + Math.round(subtotal * 0.05);
                        document.getElementById("totalCostText").innerHTML = "USD " + Math.round(subtotal * 1.05);
                    }
                });
            });
        }
    });
});

function mostrarProductoCarrito(arrayProductos) {
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProductos.length; i++) {
        let product = arrayProductos[i];
        htmlContentToAppend = `
            <div class="list-group-item list-group-item-action">
                <div class="row cart-item-container">
                    <div class="col" id="container-img-h5-cart">
                        <img src="` + product.src + `" class="img-thumbnail cart-item-img my-auto">
                        <h5 class="my-auto text-left">` + product.name + `</h5>
                    </div>
                    <div class="col-3">
                        <p class="my-auto text-center">` + product.currency + ` ` + product.unitCost + `</p>
                    </div>
                    <div class="col-2">
                        <input type="number" class="form-control count-control countInput" id="countInput${i}" value="${product.count}" min="1">
                    </div>
                    <div class="col-2">
                        <p class="my-auto text-center font-weight-bold costText" id="costText${i}">` + product.currency + ` ` + productSubTotal(product) + `</p>
                    </div>
                    <div class="col-1">
                        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
            </div>
            `
        document.getElementById("cart-list-container").innerHTML += htmlContentToAppend;
    }
    for (let i = 0; i < arrayProductos.length; i++) {
        let product = arrayProductos[i];
        document.getElementById("countInput" + i).addEventListener('change', function () {
            document.getElementById("costText" + i).innerText = product.currency + " " + productSubTotal(product, "countInput" + i);
            subtotal = cartSubTotal(article, document.getElementsByClassName("countInput"));
            document.getElementById("subtotalCostText").innerHTML = "USD " + Math.round(subtotal);
            if (document.getElementById("premiumRadio").checked) {
                document.getElementById("comissionText").innerHTML = "USD " + Math.round(subtotal * 0.15);
                document.getElementById("totalCostText").innerHTML = "USD " + Math.round(subtotal * 1.15);
            }
            if (document.getElementById("expressRadio").checked) {
                document.getElementById("comissionText").innerHTML = "USD " + Math.round(subtotal * 0.07);
                document.getElementById("totalCostText").innerHTML = "USD " + Math.round(subtotal * 1.07);
            }
            if (document.getElementById("standardRadio").checked) {
                document.getElementById("comissionText").innerHTML = "USD " + Math.round(subtotal * 0.05);
                document.getElementById("totalCostText").innerHTML = "USD " + Math.round(subtotal * 1.05);
            }
        });
    }
}

function productSubTotal(product, id) {
    let subtotalCost = 0;
    if (id === undefined) {
        subtotalCost = product.unitCost * product.count;
    } else {
        subtotalCost = document.getElementById(id).valueAsNumber * product.unitCost;
    }
    return subtotalCost;
}

function cartSubTotal(array, inputs) {
    let subtotalCost = 0;
    if (inputs === undefined) {
        for (i = 0; i < array.length; i++) {
            if (array[i].currency === "USD") {
                subtotalCost += array[i].unitCost * array[i].count;
            } else {
                subtotalCost += (array[i].unitCost * array[i].count) / 40;
            }
        }
    } else {
        for (i = 0; i < array.length; i++) {
            if (array[i].currency === "USD") {
                subtotalCost += array[i].unitCost * inputs[i].valueAsNumber;
            } else {
                subtotalCost += (array[i].unitCost * inputs[i].valueAsNumber) / 40;
            }
        }
    }
    return subtotalCost;
}

function cartTotalCost(array) {
    let totalCost = 0;
    array.forEach(product => {
        if (product.currency === "USD") {
            totalCost += productSubTotal(product);
        } else {
            totalCost += productSubTotal(product) / 40;
        }
    });
    return totalCost;
}