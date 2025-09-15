/* script.js - small cart system (front-end only)
   - uses localStorage so pages remember cart
   - short comments explain each block
*/

// helper: load cart from localStorage or empty array
function loadCart() {
  const raw = localStorage.getItem('rafay_cart');
  return raw ? JSON.parse(raw) : [];
}

// helper: save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('rafay_cart', JSON.stringify(cart));
  updateCartBadge();
}

// show number in nav cart badge
function updateCartBadge() {
  const cart = loadCart();
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = cart.length;
}

// add a product (id, title, price, image) to cart
function addToCart(product) {
  const cart = loadCart();
  cart.push(product);
  saveCart(cart);
  // small visual feedback
  alert('✅ Added to cart: ' + product.title);
}

// remove item by index (cart page)
function removeFromCart(index) {
  const cart = loadCart();
  cart.splice(index,1);
  saveCart(cart);
  saveCart(cart);
  // reload cart UI if on cart page
  if(document.getElementById('cart-list')) renderCartList();
}

// render cart list on cart page
function renderCartList() {
  const cart = loadCart();
  const list = document.getElementById('cart-list');
  const totalEl = document.getElementById('cart-total');
  if (!list || !totalEl) return;
  list.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += Number(item.price);
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div style="flex:1">
        <strong>${item.title}</strong>
        <div style="color:#376b6a">PKR ${item.price}</div>
      </div>
      <div>
        <button onclick="removeFromCart(${idx})" style="background:#ff6b6b;color:white;border:none;padding:8px 10px;border-radius:8px;cursor:pointer;">Remove</button>
      </div>
    `;
    list.appendChild(div);
  });
  totalEl.textContent = `PKR ${total.toFixed(0)}`;
  updateCartBadge();
}

// on load, update badge regardless of page
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  // if cart page, render cart items
  if(document.getElementById('cart-list')) renderCartList();
});
