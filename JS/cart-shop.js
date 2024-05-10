document.getElementById("btn-add-to-cart").addEventListener("click", function () {
    var title = document.querySelector(".card-title").innerText;
    var price = document.getElementById("price-card").innerText;
    var imageSrc = document.querySelector(".card-img-top").getAttribute("src");

    var product = {
        title: title,
        price: price,
        imageSrc: imageSrc
    };

    var cart = JSON.parse(localStorage.getItem("carritoCompras")) || [];

    cart.push(product);

    localStorage.setItem("carritoCompras", JSON.stringify(cart));

    alert("Producto agregado al carrito");
});
