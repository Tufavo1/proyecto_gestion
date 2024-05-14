// Obtener el carrito del localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Seleccionar el contenedor donde se mostrarán los elementos del carrito
const cartContainer = document.querySelector('.cart-container');



// Función para generar el HTML de un elemento del carrito
function createCartItem(item) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `
    <div class="item">
      <img src="" alt="">
      <div class="cart-item-details" style="width: 100%; display: flex; flex-direction: column; justify-content: center;">
        <h3>${item.title}</h3>
        <div class="quantity-control">
          <button class="btn-resta" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="btn-suma" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="precio"><span><strong>${item.price}</strong> CLP</span></div>
    </div>
  `;

  // Agregar evento click a los botones de suma y resta
  cartItem.querySelector('.btn-suma').addEventListener('click', incrementQuantity);
  cartItem.querySelector('.btn-resta').addEventListener('click', decrementQuantity);

  return cartItem;
}

// Función para incrementar la cantidad de un producto
function incrementQuantity(event) {
  const productId = event.target.dataset.id;

  // Buscar el producto en el carrito
  const product = cart.find(p => p.id === productId);

  // Verificar si el producto existe en el carrito
  if (product) {
    // Incrementar la cantidad del producto en 1
    product.quantity += 1;

    // Guardar el carrito actualizado en el localStorage y renderizar los elementos del carrito
    saveCartToLocalStorage();
  }
}

// Función para decrementar la cantidad de un producto
function decrementQuantity(event) {
  const productId = event.target.dataset.id;
  const product = cart.find(p => p.id === productId);

  // Verificar si el producto existe en el carrito
  if (product && product.quantity > 1) {
    // Decrementar la cantidad del producto en 1
    product.quantity -= 1;

    // Guardar el carrito actualizado en el localStorage y renderizar los elementos del carrito
    saveCartToLocalStorage();
  }
}

// Función para guardar el carrito en el localStorage
function saveCartToLocalStorage() {
  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para renderizar los elementos del carrito


// Función para calcular los montos totales
function calcularMontosTotales() {
    // Obtener el subtotal sumando los precios de todos los productos en el carrito
  const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  console.log(subtotal);

  // Calcular el monto del IVA (19% del subtotal)
  const iva = subtotal * 0.19;

  // Calcular el costo de despacho (puedes definirlo según tus requerimientos)
  const costoDespacho = 0; // Por ejemplo, si el costo de despacho es cero

  // Calcular el total sumando el subtotal, el IVA y el costo de despacho
  const total = subtotal + iva + costoDespacho;

  // Actualizar los elementos HTML con los montos calculados
  document.querySelector('#subtotal').textContent = subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  document.querySelector('#iva').textContent = iva.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  document.querySelector('#costo-despacho').textContent = costoDespacho.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  document.querySelector('#total').textContent = total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });


  }

// Función para renderizar los elementos del carrito
// Función para agregar evento input a los elementos de cantidad en el carrito
function addInputEventListeners() {
    const quantityInputs = document.querySelectorAll('.cart-item-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('input', updateCartItemQuantity);
    });
}

// Función para actualizar la cantidad de un producto en el carrito
function updateCartItemQuantity(event) {
    const productId = event.target.dataset.id;
    const newQuantity = parseInt(event.target.value);

    // Buscar el producto en el carrito
    const product = cart.find(p => p.id === productId);

    // Verificar si el producto existe en el carrito y la nueva cantidad es válida
    if (product && newQuantity >= 1) {
        // Actualizar la cantidad del producto
        product.quantity = newQuantity;

        // Guardar el carrito actualizado en el localStorage y renderizar los elementos del carrito
        saveCartToLocalStorage();
        renderCartItems();
        calcularMontosTotales();
    } else {
        // Si la nueva cantidad no es válida, restaurar la cantidad anterior
        event.target.value = product.quantity;
    }
}

// Función para renderizar los elementos del carrito
function renderCartItems() {
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartContainer.appendChild(cartItem);
    });
    // Después de renderizar los elementos, agregamos los event listeners a los inputs de cantidad
    addInputEventListeners();
    calcularMontosTotales();
}

// Llamar a la función para renderizar los elementos del carrito al inicio
renderCartItems();

  
  // Llamar a la función para renderizar los elementos del carrito
  renderCartItems();
  
