//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let verificadorModal = false;
let verificadorDir = false;
let globalProductsArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            article = resultObj.data.articles;
            globalProductsArray = article;
            mostrarProductoCarrito(article);
            document.getElementById("subtotalCostText").innerHTML = "USD " + cartSubTotal(article);
            document.getElementById("totalCostText").innerHTML = "USD " + Math.round(cartSubTotal(article) * 1.15);
            document.getElementById('comissionText').innerHTML = "USD " + Math.round(cartSubTotal(article) * 0.15);
            radios = document.getElementsByName('deliveryType');
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
            //Ejecuto el codigo una vez manual para que cuando recien se entra al modal ya se habiliten y deshabiliten los campos.
            habilitarCamposPago('cardPayMethod', 'cardInput');
            habilitarCamposPago('transferPayMethod', 'transferInput');
            document.getElementById('cardPayMethod').addEventListener('change', function () {
                habilitarCamposPago('cardPayMethod', 'cardInput');
                habilitarCamposPago('transferPayMethod', 'transferInput');
            });
            document.getElementById('transferPayMethod').addEventListener('change', function () {
                habilitarCamposPago('cardPayMethod', 'cardInput');
                habilitarCamposPago('transferPayMethod', 'transferInput');
            });
        }
    });
});

function habilitarCamposPago(id, clase) {
    const method = document.getElementById(id);
    const inputs = document.getElementsByClassName(clase);
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (method.checked) {
            input.readOnly = false;
        } else {
            input.readOnly = true;
        }
    }
}

function realizarCompra() {
    const alerta = document.getElementById("globalAlert");
    verificarDir();
    if (globalProductsArray.length > 0) {
        const exito = document.getElementById("globalSuccess");
        let mensaje = "Para finalizar la compra debe:\n";
        if (verificadorModal && verificadorDir) {
            getJSONData(CART_BUY_URL).then(function (resultObj) {
                exito.innerText = resultObj.data.msg;
                exito.style.display = "block";
                setTimeout(function () {
                    exito.style.display = "none";
                }, 4000);
            });
            document.getElementById('dirCalle').value = "";
            document.getElementById('dirNum').value = "";
            document.getElementById('dirEsq').value = "";
            document.getElementById('numCard').value = "";
            document.getElementById('codCard').value = "";
            document.getElementById('venCard').value = "";
            document.getElementById('numTrans').value = "";
            globalProductsArray = [];
            mostrarProductoCarrito(globalProductsArray);
        } else {
            if (!verificadorDir) {
                mensaje += "    Completar o corregir los datos correspondientes al envío.\n";
            }
            if (!verificadorModal) {
                mensaje += "    Seleccionar un método de pago.\n";
            }
            alerta.innerText = mensaje;
            alerta.style.display = "block";
            setTimeout(function () {
                alerta.style.display = "none";
            }, 7000);
        }
    } else {
        alerta.innerText = "No hay productos en el carrito.";
        alerta.style.display = "block";
    }
}

function verificarDir() {
    const calle = $('#dirCalle');
    const num = $('#dirNum');
    const esq = $('#dirEsq');
    verificadorDir = true;
    if (calle[0].value == "") {
        verificadorDir = verificadorDir && false;
    } else {
        verificadorDir = verificadorDir && true;
    }
    if (num[0].value == "" && isNaN(num[0].valueAsNumber)) {
        verificadorDir = verificadorDir && false;
    } else {
        verificadorDir = verificadorDir && true;
    }
    if (esq[0].value == "") {
        verificadorDir = verificadorDir && false;
    } else {
        verificadorDir = verificadorDir && true;
    }
}

function verificarModal() {
    const cardMethod = $('#cardPayMethod');
    const numCard = $('#numCard');
    const codCard = $('#codCard');
    const venCard = $('#venCard');
    const numTrans = $('#numTrans');
    const aceptarModal = $('#aceptarModal');
    const alerta = document.getElementById("modalAlert");
    let mensaje = "Para continuar debe:\n";
    verificadorModal = true;
    aceptarModal[0].removeAttribute("data-dismiss");
    if (cardMethod[0].checked) {
        if (numCard[0].value == "" && isNaN(numCard[0].valueAsNumber)) {
            verificadorModal = verificadorModal && false;
            mensaje += "    Ingresar o corregir su número de tarjeta.\n";
        } else {
            verificadorModal = verificadorModal && true;
        }
        if (codCard[0].value == "" && isNaN(codCard[0].valueAsNumber)) {
            verificadorModal = verificadorModal && false;
            mensaje += "    Ingresar o corregir el código de su tarjeta.\n";
        } else {
            verificadorModal = verificadorModal && true;
        }
        if (venCard[0].value.match(/\d\d[/]\d\d/g) == null) {
            verificadorModal = verificadorModal && false;
            mensaje += "    Ingresar o corregir la fecha de vencimiento de su tarjeta.\n";
        } else {
            verificadorModal = verificadorModal && true;
        }
    } else {
        if (numTrans[0].value == "" && isNaN(numTrans[0].valueAsNumber)) {
            verificadorModal = verificadorModal && false;
            mensaje += "    Ingresar o corregir su número de cuenta.\n";
        } else {
            verificadorModal = verificadorModal && true;
        }
    }
    if (verificadorModal) {
        aceptarModal[0].setAttribute("data-dismiss", "modal");
    } else {
        alerta.innerText = mensaje;
        alerta.style.display = "block";
        setTimeout(function () {
            alerta.style.display = "none";
        }, 7000);
    }
}

function mostrarProductoCarrito(arrayProductos) {
    let htmlContentToAppend = "";
    if (arrayProductos.length == 0) {
        document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
    } else {
        for (let i = 0; i < arrayProductos.length; i++) {
            let product = arrayProductos[i];
            htmlContentToAppend = `
                <div class="list-group-item list-group-item-action" id="cont${i}">
                    <div class="row cart-item-container">
                        <div class="col text-center my-auto">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-6 col-lg-4 d-none d-sm-block">
                                    <img src="` + product.src + `" class="img-thumbnail cart-item-img my-auto d-none d-sm-block">
                                </div>
                                <div class="col-auto col-lg-8">
                                    <h5 class="my-auto text-center text-lg-left">` + product.name + `</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 text-center my-auto">
                            <p class="my-auto text-center">` + product.currency + ` ` + product.unitCost + `</p>
                        </div>
                        <div class="col-2 text-center my-auto">
                            <input type="number" class="form-control count-control countInput" id="countInput${i}" value="${product.count}" min="1" style="min-width: 50px;">
                        </div>
                        <div class="col-2 text-center my-auto">
                            <p class="my-auto text-center font-weight-bold costText" id="costText${i}">` + product.currency + ` ` + productSubTotal(product) + `</p>
                        </div>
                        <div class="col-1 text-center my-auto">
                            <svg id="borrarCont${i}" width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            `
            document.getElementById("cart-list-container").innerHTML += htmlContentToAppend;
        }
    }
    document.getElementById("subtotalCostText").innerHTML = "USD " + cartSubTotal(arrayProductos);
    document.getElementById("totalCostText").innerHTML = "USD " + Math.round(cartSubTotal(arrayProductos) * 1.15);
    document.getElementById('comissionText').innerHTML = "USD " + Math.round(cartSubTotal(arrayProductos) * 0.15);
    for (let i = 0; i < arrayProductos.length; i++) {
        let product = arrayProductos[i];
        document.getElementById("countInput" + i).addEventListener('change', function () {
            document.getElementById("costText" + i).innerText = product.currency + " " + productSubTotal(product, "countInput" + i);
            subtotal = cartSubTotal(arrayProductos, document.getElementsByClassName("countInput"));
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
        document.getElementById("borrarCont" + i).addEventListener('click', function () {
            removeProduct(arrayProductos, i);
        });
    }
}

function removeProduct(array, index) {
    document.getElementById("cart-list-container").innerHTML = "";
    array.splice(index, 1);
    globalProductsArray = array;
    mostrarProductoCarrito(array);
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

/* function comprar() {
    fetch('http://localhost:3000/compras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cart: {
                username: sessionStorage.getItem('usuario'),
                product: "2kg de papa"
            }
        }).then(function (res) {
            console.log(res.json());
        })
    })
} */