document.addEventListener('DOMContentLoaded', function () {

    const addToCartButtons = document.querySelectorAll('.btn-cart');
    const cartCounter = document.querySelector('.cart-counter');
    const cartLink = document.getElementById('cartLink');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartClicked);
    });

    updateCartCounter();

    function addToCartClicked(event) {
        const button = event.target;
        const card = button.closest('.card');
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardPrice = card.querySelector('.card-price').textContent;
        const cardId = card.getAttribute('id');

        addItemToCart(cardId, cardTitle, cardPrice);
        updateCartCounter();
        updateCartLink();
    }

    function addItemToCart(id, title, price) {
        const cartItem = {
            id: id,
            title: title,
            price: price
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCounter) {
            cartCounter.textContent = cart.length;
        }
    }

    function updateCartLink() {
        if (!localStorage.getItem('cart') || JSON.parse(localStorage.getItem('cart')).length === 0) {
            cartLink.classList.add('disabled');
            cartLink.removeAttribute('href');
        } else {
            cartLink.classList.remove('disabled');
            cartLink.setAttribute('href', 'carrito.html');
        }
    }
});
