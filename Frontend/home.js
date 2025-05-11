// Updated products data for new categories
const products = {
    homeDecor: [
        { 
            id: 1,
            name: 'Artisan Ceramic Vase',
            price: 68.00,
            img: 'WhatsApp Image 2024-12-27 at 16.39.54_3ddef5dc.jpg',
            category: 'homeDecor',
            details: {
                Material: 'Stoneware Clay',
                Dimensions: '12" Height',
                Features: 'Hand-glazed Finish'
            }
        },
        { 
            id: 2,
            name: 'Macramé Wall Art',
            price: 45.00,
            img: 'WhatsApp Image 2024-12-27 at 16.39.44_53898508.jpg',
            category: 'homeDecor',
            details: {
                Material: 'Organic Cotton Cord',
                Dimensions: '24" Diameter',
                Style: 'Bohemian Design'
            }
        }
    ],
    artCollectibles: [
        { 
            id: 1,
            name: 'Oil Landscape Painting',
            price: 350.00,
            img: 'WhatsApp Image 2024-12-27 at 03.44.39_4237d596.jpg',
            category: 'artCollectibles',
            details: {
                Medium: 'Oil on Canvas',
                Size: '18" x 24"',
                Signature: 'Signed by Artist'
            }
        },
        { 
            id: 2,
            name: 'Bronze Figurine',
            price: 120.00,
            img: 'WhatsApp Image 2024-12-27 at 03.41.17_1d279071.jpg',
            category: 'artCollectibles',
            details: {
                Material: 'Lost-wax Casting',
                Height: '8"',
                Edition: 'Limited Edition'
            }
        }
    ],
    accessories: [
        { 
            id: 1,
            name: 'Silk Embroidered Scarf',
            price: 55.00,
            img: 'WhatsApp Image 2024-12-27 at 18.28.04_5214b3d9.jpg',
            category: 'accessories',
            details: {
                Material: '100% Mulberry Silk',
                Dimensions: '35" x 35"',
                Colors: 'Hand-dyed Colors'
            }
        },
        { 
            id: 2,
            name: 'Tooled Leather Journal',
            price: 42.00,
            img: 'WhatsApp Image 2024-12-27 at 18.00.56_ec103c53.jpg',
            category: 'accessories',
            details: {
                Material: 'Vegetable-tanned Leather',
                Size: 'A5',
                Construction: 'Hand-stitched Binding'
            }
        }
    ],
    paperGoods: [
        { 
            id: 1,
            name: 'Linen Wedding Invitations',
            price: 35.00,
            img: 'freepik-holo-abstract-ticket-49922-20241227164349EBoX.png',
            category: 'paperGoods',
            details: {
                Material: '120gsm Linen Paper',
                Customization: 'Custom Text Available',
                Contents: 'Set of 10 with Envelopes'
            }
        },
        { 
            id: 2,
            name: 'Botanical Art Prints',
            price: 25.00,
            img: 'WhatsApp Image 2024-12-27 at 03.45.04_34ea5fec.jpg',
            category: 'paperGoods',
            details: {
                Paper: 'Archival Matte',
                Sizes: '8x10" to 16x20"',
                Edition: 'Limited Edition Numbering'
            }
        }
    ],
    toys: [
        { 
            id: 1,
            name: 'Montessori Sorting Toy',
            price: 28.00,
            img: 'WhatsApp Image 2024-12-27 at 17.05.52_833ec794.jpg',
            category: 'toys',
            details: {
                Material: 'Solid Beechwood',
                Finish: 'Non-toxic',
                Age: 'Ages 2+'
            }
        },
        { 
            id: 2,
            name: 'Felt Farm Animal Set',
            price: 38.00,
            img: 'WhatsApp Image 2024-12-27 at 16.55.50_dcd8cc02.jpg',
            category: 'toys',
            details: {
                Details: 'Hand-stitched',
                Pieces: '10 Piece Set',
                Care: 'Washable Materials'
            }
        }
    ],
    fiberCrafts: [
        { 
            id: 1,
            name: 'Merino Wool Yarn',
            price: 12.00,
            img: 'WhatsApp Image 2024-12-27 at 18.28.34_fd5d8c7d.jpg',
            category: 'fiberCrafts',
            details: {
                Weight: 'DK (50g skein)',
                Dyes: 'Plant-based',
                Colors: '15 Options'
            }
        },
        { 
            id: 2,
            name: 'Beginner Weaving Kit',
            price: 55.00,
            img: 'WhatsApp Image 2024-12-27 at 18.28.34_0216df28.jpg',
            category: 'fiberCrafts',
            details: {
                Includes: 'Loom + Tools',
                Material: 'Organic Cotton',
                Instructions: 'Instruction Booklet'
            }
        }
    ]
};

let cart = [];

// Function to render products for new categories
function renderProducts() {
    const categories = {
        homeDecor: document.getElementById('home-decor').querySelector('.items'),
        artCollectibles: document.getElementById('art-collectibles').querySelector('.items'),
        accessories: document.getElementById('accessories').querySelector('.items'),
        paperGoods: document.getElementById('paper-goods').querySelector('.items'),
        toys: document.getElementById('toys').querySelector('.items'),
        fiberCrafts: document.getElementById('fiber-crafts').querySelector('.items')
    };

    // Render products for each category
    Object.entries(products).forEach(([categoryName, categoryProducts]) => {
        const container = categories[categoryName];
        categoryProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'item';
            productElement.dataset.category = categoryName;
            productElement.dataset.id = product.id;
            productElement.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="info">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <div class="product-controls">
                        <div class="quantity-selector">
                            <label>Qty:</label>
                            <input type="number" class="quantity-input" min="1" value="1">
                        </div>
                        <div class="product-buttons">
                            <button onclick="addToCart('${categoryName}', ${product.id})">Add to Cart</button>
                            <button onclick="buyNow('${categoryName}', ${product.id})">Buy Now</button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(productElement);
        });
    });
}

// Fixed addToCart function with quantity handling
function addToCart(category, productId) {
    const itemElement = document.querySelector(`[data-category="${category}"][data-id="${productId}"]`);
    const quantityInput = itemElement.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value) || 1;
    
    const product = products[category].find(item => item.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => 
            item.id === productId && item.category === category
        );
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        updateCart();
        showNotification(`${quantity} ${product.name} added to cart!`);
        quantityInput.value = 1; // Reset quantity input
    }
}

// Fixed buyNow function
function buyNow(category, productId) {
    addToCart(category, productId);
    window.location.href = 'electronicpayment.html';
}

// Cart management functions
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    cartContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function proceedToPayment() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    window.location.href = 'electronicpayment.html';
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Initialize the store
document.addEventListener('DOMContentLoaded', renderProducts);
