const CART_KEY = "cart";

function parseCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function money(n) {
    const num = Number(n);
    if (Number.isNaN(num)) return "$0";
    return `$${num}`;
}

function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (!el) return;

    const cart = parseCart();
    const count = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    el.innerText = String(count);
}

function addToCart(name, price) {
    const p = Number(price);

    const cart = parseCart();
    const idx = cart.findIndex((x) => x.name === name);

    if (idx >= 0) {
        cart[idx].qty = (cart[idx].qty || 1) + 1;
    } else {
        cart.push({ name, price: p, qty: 1 });
    }

    saveCart(cart);
}

function getButtonData(btn) {
    const name = btn.getAttribute("data-name") || btn.closest(".product-card")?.querySelector("h3")?.innerText?.trim();
    const priceText = btn.getAttribute("data-price") || btn.closest(".product-card")?.querySelector("p")?.innerText?.trim();

    const priceNumber = String(priceText || "").replace(/[^0-9.]/g, "");

    return { name, price: priceNumber };
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const buttons = document.querySelectorAll(".buy-btn");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const { name, price } = getButtonData(button);
            if (!name) {
                alert("Could not add product.");
                return;
            }

            addToCart(name, price);
            alert("Added To Cart!");

            window.location.href = "login.html";
        });
    });
});

function goToPayment() {
    window.location.href = "payment.html";
}

function guestLogin() {
    window.location.href = "payment.html";
}

function payNow() {
    const cart = parseCart();

    if (!cart.length) {
        alert("Your cart is empty.");
        window.location.href = "product.html";
        return;
    }

    const total = cart.reduce((sum, item) => sum + (Number(item.price) * (item.qty || 0)), 0);
    alert(`Payment Successful! Total: $${total}`);

    localStorage.removeItem(CART_KEY);
    updateCartCount();

    window.location.href = "index.html";
}

function renderPaymentSummary() {
    const cart = parseCart();
    const itemsEl = document.getElementById("payment-items");
    const totalEl = document.getElementById("payment-total");

    if (!itemsEl || !totalEl) return;

    if (!cart.length) {
        itemsEl.innerHTML = "<p>No items in cart.</p>";
        totalEl.innerText = "$0";
        return;
    }

    itemsEl.innerHTML = cart
        .map((item) => {
            const qty = item.qty || 0;
            return `<div class="payment-item">${item.name} × ${qty} = ${money(Number(item.price) * qty)}</div>`;
        })
        .join("");

    const total = cart.reduce((sum, item) => sum + (Number(item.price) * (item.qty || 0)), 0);
    totalEl.innerText = money(total);
}

window.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderPaymentSummary();
});
let count = 0;

const buttons = document.querySelectorAll(".buy-btn");

buttons.forEach(function(button){

    button.addEventListener("click", function(){

        count++;

        document.getElementById("cart-count").innerText = count;

        alert("Added To Cart!");

    });

});
window.addEventListener("load", function(){

    document.getElementById("loader").style.display = "none";

});const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function(){

    navLinks.classList.toggle("active");

});