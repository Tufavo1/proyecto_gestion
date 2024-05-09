function cargarCarrito() {
    var cart = JSON.parse(localStorage.getItem("carritoCompras")) || [];
    var tableBody = document.querySelector("#cart-table tbody");

    tableBody.innerHTML = "";

    cart.forEach(function (product) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${product.imageSrc}" alt="Imagen de producto" style="width: 50px; height: 50px;"></td>
            <td>${product.title}</td>
            <td>$${product.price}</td>
        `;
        tableBody.appendChild(row);
    });
}

window.addEventListener("load", cargarCarrito);

var shippingForm = document.getElementById("shipping-form");
var shippingDetailsSection = document.getElementById("shipping-details");
var pickupDetailsSection = document.getElementById("pickup-details");
var editarDireccionButton = document.getElementById("editar-direccion");

shippingForm.addEventListener("change", function (event) {
    if (event.target.value === "domicilio") {
        shippingDetailsSection.style.display = "block";
        disableFormFields(shippingDetailsSection);
        editarDireccionButton.style.display = "block";
        pickupDetailsSection.style.display = "none";

    } else if (event.target.value === "retiro") {
        shippingDetailsSection.style.display = "none";
        pickupDetailsSection.style.display = "block";
        editarDireccionButton.style.display = "none";
    }
});

var confirmarEnvioButton = document.getElementById("confirmar-envio");

confirmarEnvioButton.addEventListener("click", function () {
    alert("Detalles de envío confirmados");
    disableFormFields(shippingDetailsSection);
    editarDireccionButton.style.display = "block";
});

editarDireccionButton.addEventListener("click", function () {
    enableFormFields(shippingDetailsSection);
    editarDireccionButton.style.display = "none";
});

var confirmarRetiroButton = document.getElementById("confirmar-retiro");

confirmarRetiroButton.addEventListener("click", function () {
    alert("Retiro físico confirmado");
    disableFormFields(pickupDetailsSection);
});

function disableFormFields(form) {
    var fields = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < fields.length; i++) {
        fields[i].disabled = true;
    }
}

function enableFormFields(form) {
    var fields = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < fields.length; i++) {
        fields[i].disabled = false;
    }
}