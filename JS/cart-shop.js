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
        const cardPrice = card.querySelector('#price-card').textContent; // Actualizado el selector
        const cardId = card.getAttribute('id');
    
        addItemToCart(cardId, cardTitle, cardPrice);
        updateCartCounter();
        updateCartLink();
    }

    function addItemToCart(id, title, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verificar si el ítem ya está en el carrito
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            // Si el ítem ya está en el carrito, aumentar su cantidad
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            // Si el ítem no está en el carrito, agregarlo con cantidad 1
            const cartItem = {
                id: id,
                title: title,
                price: price,
                quantity: 1 // Establecer la cantidad inicial en 1
            };
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCounter) {
            // Calcular la cantidad total de ítems sumando las cantidades de todos los ítems en el carrito
            const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCounter.textContent = totalQuantity;
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
