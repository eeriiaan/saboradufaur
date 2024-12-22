// Variables
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const closeCartButton = document.getElementById('close-cart');
const messageField = document.getElementById('mensaje'); // Campo del formulario
let cart = [];

// Abrir el modal del carrito
document.getElementById('cart-container').addEventListener('click', () => {
    cartModal.classList.add('show');
    cartModal.style.display = 'flex';  // Asegura que se muestre
    renderCart();
});

// Cerrar el modal del carrito
closeCartButton.addEventListener('click', () => {
    cartModal.classList.remove('show');
    cartModal.style.display = 'none';  // Lo oculta cuando se cierra
});

// Añadir productos al carrito
document.querySelectorAll('.product-item button').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const name = product.querySelector('h4').textContent;
        const price = parseFloat(product.querySelector('p').textContent.replace('$', ''));
        addToCart({ name, price });
    });
});

// Renderizar el carrito
function renderCart() {
    cartItems.innerHTML = ''; // Limpiar los items previos
    let total = 0;
    let productDetails = '';

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        // Crear un botón para eliminar el producto
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.style.marginLeft = '10px';
        removeButton.addEventListener('click', () => {
            removeFromCart(index); // Eliminar producto usando el índice
        });

        li.appendChild(removeButton);
        cartItems.appendChild(li);

        // Agregar detalles del producto al mensaje
        productDetails += `${item.name} - $${item.price.toFixed(2)}\n`;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = cart.length;

    // Actualizar el campo de mensaje del formulario
    messageField.value = `Productos seleccionados:\n${productDetails}Total: $${total.toFixed(2)}`;
}

// Añadir un producto al carrito
function addToCart(product) {
    cart.push(product);
    renderCart();
}

// Eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Elimina el producto en el índice indicado
    renderCart(); // Volver a renderizar el carrito actualizado
}

// Función para verificar si los campos del formulario están completos
function verificarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre === "" || email === "" || mensaje === "") {
        console.log("Por favor, completa todos los campos.");
        return false; // Prevenimos el envío del formulario
    } else {
        console.log("Formulario completo, enviando...");
        return true; // Permite enviar el formulario
    }
}

// Añadir un evento de escucha al formulario para verificar antes de enviar
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function(event) {
    if (!verificarFormulario()) {
        event.preventDefault(); // Evita el envío si los campos no están completos
    }
});


