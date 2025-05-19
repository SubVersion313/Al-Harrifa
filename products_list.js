// products_list.js
let currentPage = 1;
let currentCategory = null;
let currentPriceRange = 500;

async function fetchProducts(page = 1, category = null, maxPrice = 500) {
    try {
        const queryParams = new URLSearchParams({
            page,
            pageSize: 12,
            ...(category && { category }),
            maxPrice
        });

        const response = await fetch(`/api/products?${queryParams}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch products');
        }
        const data = await response.json();

        // Validate response data
        if (!data.products || !Array.isArray(data.products)) {
            throw new Error('Invalid response format');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        showNotification('Failed to load products. Please try again later.');
        return { products: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, pageSize: 12 } };
    }
}

function renderPagination(pagination) {
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
            
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = '←';
    prevButton.disabled = pagination.currentPage === 1;
    prevButton.onclick = () => loadProducts(pagination.currentPage - 1);
    paginationContainer.appendChild(prevButton);
            
    // Page numbers
    for (let i = 1; i <= pagination.totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = i === pagination.currentPage ? 'active' : '';
        pageButton.onclick = () => loadProducts(i);
        paginationContainer.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = '→';
    nextButton.disabled = pagination.currentPage === pagination.totalPages;
    nextButton.onclick = () => loadProducts(pagination.currentPage + 1);
    paginationContainer.appendChild(nextButton);

    return paginationContainer;
    }

function createProductCard(product) {
    // Validate product data
    if (!product || typeof product !== 'object') {
        console.error('Invalid product data:', product);
        return null;
    }

    const { id, name, price, imageUrl, category, sellerName } = product;
    
    // Validate required fields
    if (!id || !name || typeof price !== 'number' || !imageUrl || !category) {
        console.error('Missing required product fields:', product);
        return null;
    }

    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-category', category);
    productCard.setAttribute('data-id', id);
    
    productCard.innerHTML = `
        <img src="${imageUrl}" alt="${name}" onerror="this.src='placeholder.jpeg'">
        <div class="product-info">
            <h3>${name}</h3>
            <p class="price">$${price.toFixed(2)}</p>
            <p class="seller">By ${sellerName || 'Unknown Seller'}</p>
            <div class="product-actions">
                <button onclick="addToCart('${category}', ${id})">Add to Cart</button>
                <button onclick="buyNow('${category}', ${id})">Buy Now</button>
                </div>
            </div>
        `;
        
    return productCard;
    }

async function loadProducts(page = 1) {
    currentPage = page;
    const productsContainer = document.querySelector('.all-products-grid');
    if (!productsContainer) return;

    // Show loading state
    productsContainer.innerHTML = '<div class="loading">Loading products...</div>';

    try {
        // Get selected categories
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
            .map(cb => cb.value);

        // Fetch products
        const { products, pagination } = await fetchProducts(
            page,
            selectedCategories.length === 1 ? selectedCategories[0] : null,
            currentPriceRange
        );

        // Clear loading state
        productsContainer.innerHTML = '';

        // Create products grid
        const grid = document.createElement('div');
        grid.className = 'products-grid';

        // Add products to grid
        products.forEach(product => {
            const productCard = createProductCard(product);
            if (productCard) {
                grid.appendChild(productCard);
            }
        });

        // Show message if no products found
        if (products.length === 0) {
            productsContainer.innerHTML = '<div class="no-products">No products found matching your criteria</div>';
            return;
        }

        productsContainer.appendChild(grid);
        productsContainer.appendChild(renderPagination(pagination));
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = '<div class="error">Failed to load products. Please try again later.</div>';
    }
    }

// Initialize filters
document.addEventListener('DOMContentLoaded', () => {
    // Category filter
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            currentPage = 1;
            loadProducts();
    });
    });

    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            currentPriceRange = parseInt(e.target.value);
            priceValue.textContent = currentPriceRange;
        });

        priceRange.addEventListener('change', () => {
            currentPage = 1;
            loadProducts();
    });
    }

    // Initial load
    loadProducts();
});

// Cart functions
function addToCart(category, productId) {
    try {
        const productCard = document.querySelector(`[data-category="${category}"][data-id="${productId}"]`);
        if (!productCard) {
            throw new Error('Product not found');
        }

        const product = {
            id: productId,
            name: productCard.querySelector('h3').textContent,
            price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
            category: category,
            imageUrl: productCard.querySelector('img').src
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        showNotification('Product added to cart!');
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Failed to add product to cart. Please try again.');
    }
}

function buyNow(category, productId) {
    addToCart(category, productId);
    window.location.href = 'electronicpayment.html';
}

function updateCart() {
    try {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (!cartItems || !cartTotal) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = '';
        
        let total = 0;
    cart.forEach((item, index) => {
            if (!item || !item.price) {
                console.warn('Invalid cart item:', item);
                return;
            }
            total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
                <span>${item.name || 'Unknown Product'}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">×</button>
        `;
            cartItems.appendChild(cartItem);
    });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    } catch (error) {
        console.error('Error updating cart:', error);
        showNotification('Failed to update cart. Please refresh the page.');
    }
}

function removeFromCart(index) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (index < 0 || index >= cart.length) {
            throw new Error('Invalid cart item index');
        }
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        showNotification('Item removed from cart');
    } catch (error) {
        console.error('Error removing from cart:', error);
        showNotification('Failed to remove item from cart. Please try again.');
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
}

function proceedToPayment() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    window.location.href = 'electronicpayment.html';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}