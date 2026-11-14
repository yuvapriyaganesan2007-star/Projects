
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        description: "Premium sound with comfortable wireless listening."
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        description: "Track your daily activities in style."
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "fashion",
        price: 1899,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        description: "Lightweight shoes for everyday comfort."
    },
    {
        id: 4,
        name: "Classic Backpack",
        category: "fashion",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        description: "A stylish backpack for work and travel."
    },
    {
        id: 5,
        name: "Sunglasses",
        category: "accessories",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
        description: "Modern sunglasses with a classic design."
    },
    {
        id: 6,
        name: "Leather Wallet",
        category: "accessories",
        price: 599,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
        description: "Compact wallet for your everyday essentials."
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1299,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
        description: "Enjoy music with powerful portable sound."
    },
    {
        id: 8,
        name: "Casual T-Shirt",
        category: "fashion",
        price: 499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
        description: "Comfortable everyday casual wear."
    },
    {
        id: 9,
        name: "Premium Watch",
        category: "accessories",
        price: 1999,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
        description: "An elegant watch for every occasion."
    },

{
    id: 10,
    name: "Wireless Keyboard",
    category: "electronics",
    price: 1499,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description: "Slim and comfortable wireless keyboard."
},
{
    id: 11,
    name: "Portable Power Bank",
    category: "electronics",
    price: 999,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600",
    description: "Compact power bank for everyday charging."
},
{
    id: 12,
    name: "Laptop Stand",
    category: "electronics",
    price: 1299,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    description: "Adjustable stand for a comfortable workspace."
},
{
    id: 13,
    name: "Denim Jacket",
    category: "fashion",
    price: 1999,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    description: "Classic denim jacket for casual styling."
},
{
    id: 14,
    name: "Cotton Hoodie",
    category: "fashion",
    price: 1299,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    description: "Soft and comfortable everyday hoodie."
},
{
    id: 15,
    name: "Travel Tote Bag",
    category: "accessories",
    price: 799,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363",
    description: "Spacious tote bag for daily essentials."
},
{
    id: 16,
    name: "Insulated Water Bottle",
    category: "accessories",
    price: 599,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    description: "Reusable bottle for everyday hydration."
},
{
    id: 17,
    name: "Classic Wrist Watch",
    category: "accessories",
    price: 2499,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    description: "Elegant watch with a timeless design."
}

];

// PRODUCT DISPLAY FUNCTION

const productGrid = document.getElementById("productGrid");

function displayProducts(items) {

    productGrid.innerHTML = "";

    if (items.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}"
                 loading="lazy">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <p class="product-category">
                    ${product.description}
                </p>


<button class="wishlist-btn" data-id="${product.id}">
    ♡
</button>


                <button class="add-cart-btn"
                    data-id="${product.id}">
                    Add to Cart
                </button>

            </div>
        `;

        productGrid.appendChild(productCard);

    });
}

// DISPLAY ALL PRODUCTS
displayProducts(products);


// PRODUCT SEARCH

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts);

});


// CATEGORY FILTER

const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", () => {

    const selectedCategory = categoryFilter.value;
    const searchText = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });

    displayProducts(filteredProducts);

});


// PRICE SORTING

const sortFilter = document.getElementById("sortFilter");

sortFilter.addEventListener("change", () => {

    const selectedCategory = categoryFilter.value;
    const searchText = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    if (sortFilter.value === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortFilter.value === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);

});


// SHOPPING CART

let cart = JSON.parse(localStorage.getItem("smartCart")) || [];

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

// SAVE CART
function saveCart() {
    localStorage.setItem("smartCart", JSON.stringify(cart));
}

// ADD PRODUCT
function addToCart(productId) {

    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCart();

}

// UPDATE CART DISPLAY
function updateCart() {

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price.toLocaleString("en-IN")}</p>
            </div>

            <div>
                <button onclick="changeQuantity(${item.id}, -1)">−</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">+</button>

                <button class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(div);

    });

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        `Total: ₹${totalPrice.toLocaleString("en-IN")}`;

}

// CHANGE QUANTITY
function changeQuantity(productId, amount) {

    const item = cart.find(p => p.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== productId);
    }

    saveCart();
    updateCart();

}

// REMOVE PRODUCT
function removeFromCart(productId) {

    cart = cart.filter(p => p.id !== productId);

    saveCart();
    updateCart();

}

// ADD TO CART BUTTON EVENTS
productGrid.addEventListener("click", (event) => {

    const button = event.target.closest(".add-cart-btn");

    if (!button) return;

    addToCart(Number(button.dataset.id));
    showToast("Product added to cart successfully!");

});

// INITIAL CART DISPLAY
updateCart();


// DARK MODE TOGGLE

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("smartCartTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDarkMode =
        document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDarkMode ? "☀️" : "🌙";

    localStorage.setItem(
        "smartCartTheme",
        isDarkMode ? "dark" : "light"
    );

});


// WISHLIST FUNCTIONALITY

let wishlist = JSON.parse(localStorage.getItem("smartCartWishlist")) || [];

function saveWishlist() {
    localStorage.setItem("smartCartWishlist", JSON.stringify(wishlist));
}

function updateWishlistButtons() {
    document.querySelectorAll(".wishlist-btn").forEach(button => {
        const productId = Number(button.dataset.id);

        button.textContent = wishlist.includes(productId) ? "♥" : "♡";
        button.classList.toggle("active", wishlist.includes(productId));
    });
}

function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
    } else {
        wishlist.push(productId);
    }

    saveWishlist();
    updateWishlistButtons();
    showToast(
    wishlist.includes(productId)
        ? "Added to your wishlist!"
        : "Removed from your wishlist!"
);
}

productGrid.addEventListener("click", event => {
    const button = event.target.closest(".wishlist-btn");

    if (button) {
        toggleWishlist(Number(button.dataset.id));
    }
});

// Update hearts when products are displayed
const originalDisplayProducts = displayProducts;

displayProducts = function(items) {
    originalDisplayProducts(items);
    updateWishlistButtons();
};

updateWishlistButtons();


// DISPLAY WISHLIST PRODUCTS

const wishlistGrid = document.getElementById("wishlistGrid");

function displayWishlist() {
    const savedProducts = products.filter(product =>
        wishlist.includes(product.id)
    );

    if (savedProducts.length === 0) {
        wishlistGrid.innerHTML = "<p>Your wishlist is empty. Add some favourites!</p>";
        return;
    }

    wishlistGrid.innerHTML = savedProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <h4>₹${product.price.toLocaleString("en-IN")}</h4>
                <p>${product.description}</p>
                <button class="add-cart-btn" data-id="${product.id}">
                    Add to Cart
                </button>
                <button class="remove-wishlist-btn" data-id="${product.id}">
                    Remove ♥
                </button>
            </div>
        </div>
    `).join("");
}

// Remove products from wishlist
wishlistGrid.addEventListener("click", event => {
    const button = event.target.closest(".remove-wishlist-btn");

    if (button) {
        toggleWishlist(Number(button.dataset.id));
        displayWishlist();
    }
});

// Refresh wishlist whenever a heart is clicked
const previousToggleWishlist = toggleWishlist;

toggleWishlist = function(productId) {
    previousToggleWishlist(productId);
    displayWishlist();
};

displayWishlist();

wishlistGrid.addEventListener("click", event => {
    const button = event.target.closest(".add-cart-btn");

    if (button) {
        addToCart(Number(button.dataset.id));
        showToast("Product added to cart successfully!");
        alert("Product added to cart!");
    }
});

// CHECKOUT MODAL

const checkoutButton = document.getElementById("checkoutButton");
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");
const orderSummary = document.getElementById("orderSummary");
const checkoutTotal = document.getElementById("checkoutTotal");

// Open checkout modal
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    orderSummary.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toLocaleString("en-IN")}</span>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    checkoutTotal.textContent = `₹${total.toLocaleString("en-IN")}`;
    checkoutModal.hidden = false;
});

// Close checkout modal
closeModal.addEventListener("click", () => {
    checkoutModal.hidden = true;
});

// PLACE ORDER

const checkoutForm = document.getElementById("checkoutForm");
const customerName = document.getElementById("customerName");

// PLACE ORDER AND SHOW SUCCESS SCREEN

const successScreen = document.getElementById("successScreen");
const successMessage = document.getElementById("successMessage");
const continueShopping = document.getElementById("continueShopping");

checkoutForm.addEventListener("submit", event => {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = customerName.value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    successMessage.textContent =
        `Thank you, ${name}! Your SmartCart order has been placed successfully.`;

    cart = [];
    saveCart();
    updateCart();

    checkoutForm.reset();
    checkoutModal.hidden = true;
    successScreen.hidden = false;
});

// CONTINUE SHOPPING

continueShopping.addEventListener("click", () => {
    successScreen.hidden = true;
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

// TOAST NOTIFICATION FUNCTION

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}