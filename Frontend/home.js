// Example products data (you can replace this with actual product data)
const products = {
    tshirts: [
        { id: 1, name: 'Home Kit:', price: 1200, img: 'WhatsApp Image 2024-12-27 at 16.39.54_3ddef5dc.jpg' },
        { id: 2, name: 'Away Kit', price: 1100, img: 'WhatsApp Image 2024-12-27 at 16.39.44_53898508.jpg' },
        { id: 3, name: 'MThird Kit:', price: 450, img:  'WhatsApp Image 2024-12-27 at 03.44.39_4237d596.jpg' },
        { id: 4, name: 'Fourth Kit:', price: 350, img:  'WhatsApp Image 2024-12-27 at 03.41.17_1d279071.jpg' },
        { id: 5, name: 'Fifth Kit:', price: 150, img:  'WhatsApp Image 2024-12-27 at 18.28.04_5214b3d9.jpg' }
    ],
    tickets: [
        { id: 1, name: 'Match Ticket ', price: 150, img: 'WhatsApp Image 2024-12-27 at 18.00.56_ec103c53.jpg' },
        { id: 2, name: 'VIP Ticket #1', price: 300, img: 'freepik-holo-abstract-ticket-49922-20241227164349EBoX.png' },
        { id: 3, name: 'VIP Ticket #2', price: 1100, img: 'WhatsApp Image 2024-12-27 at 03.45.04_34ea5fec.jpg' }
    ],
    prints: [
        { id: 1, name: 'Mavro Poster #1', price: 449, img: 'WhatsApp Image 2024-12-27 at 17.05.52_833ec794.jpg' },
        { id: 2, name: 'Mavro Poster #2', price: 349, img: 'WhatsApp Image 2024-12-27 at 16.55.50_dcd8cc02.jpg' },
        { id: 3, name: 'Boys Team Cap  #3', price: 390, img: 'WhatsApp Image 2024-12-27 at 18.28.34_fd5d8c7d.jpg' },
        { id: 4, name: 'Girls Team Cap  #3', price: 390, img: 'WhatsApp Image 2024-12-27 at 18.28.34_0216df28.jpg' }
    ]
};

let cart = []; // Array to hold the cart items

// Function to render products to the page
function renderProducts() {
    const tshirtContainer = document.getElementById('tshirt-items');
    const ticketContainer = document.getElementById('ticket-items');
    const printContainer = document.getElementById('print-items');

    // Render T-Shirts
    products.tshirts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('item');
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart('tshirts', ${product.id})">Add to Cart</button>
            </div>
        `;
        tshirtContainer.appendChild(productElement);
    });

    // Render Tickets
    products.tickets.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('item');
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart('tickets', ${product.id})">Add to Cart</button>
            </div>
        `;
        ticketContainer.appendChild(productElement);
    });

    // Render Printed Materials
    products.prints.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('item');
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart('prints', ${product.id})">Add to Cart</button>
            </div>
        `;
        printContainer.appendChild(productElement);
    });
}

// Function to add item to the cart
function addToCart(category, productId) {
    const product = products[category].find(item => item.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to update the cart and total price
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Clear current cart items
    cartContainer.innerHTML = '';

    // Add cart items to the DOM
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to handle Confirm Purchase button
function confirmPurchase() {
    // Redirect to the payment page
    window.location.href = 'electronicpayment.html';
}

// Function to handle Cancel Purchase button
function cancelPurchase() {
    // Redirect back to the store page or perform any other action
    alert('Purchase cancelled. Returning to store.');
    window.location.href = 'index.html'; // Replace 'index.html' with your store's main page
}


// Function to clear the cart
function clearCart() {
    cart = [];
    updateCart();
}

// Function to proceed to payment (dummy function for now)
function proceedToPayment() {
    alert('Proceeding to payment...');
}

// Function to confirm the purchase (dummy function for now)
function confirmPurchase() {
    alert('Purchase confirmed!');
}

// Function to cancel the purchase (dummy function for now)
function cancelPurchase() {
    alert('Purchase cancelled!');
}

// Initialize the products and cart
renderProducts();
