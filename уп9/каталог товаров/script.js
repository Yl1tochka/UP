// Массив товаров
const products = [
  { id: 1, name: "Kugoo Kirin M4", price: 29900, image: "https://via.placeholder.com/200x200?text= Самокат" },
  { id: 2, name: "Kugoo Kirin M4", price: 29900, image: "https://via.placeholder.com/200x200?text= Самокат" },
  // Добавьте остальные товары
];

// Инициализация корзины
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Функция отображения товаров
function renderProducts() {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="tag new">Новый</div>
      <h3>${product.name}</h3>
      <p>2000 мAh | 1.2 п.с. | 60 км/ч | 5 часов</p>
      <p class="price">${product.price.toLocaleString()} ₽</p>
      <button class="buy-btn" data-id="${product.id}">Купить в 1 клик</button>
    `;

    productGrid.appendChild(card);
  });
}

// Функция добавления товара в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  if (product) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
}

// Функция отображения корзины
function renderCart() {
  const cartItemsList = document.getElementById("cart-items-list");
  cartItemsList.innerHTML = "";

  cart.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
        <div>
          <strong>${item.name}</strong>
          <p>В наличии + 2 подарка</p>
        </div>
      </td>
      <td>
        <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
      </td>
      <td>${(item.price * item.quantity).toLocaleString()} ₽</td>
      <td>
        <button class="remove-btn" data-id="${item.id}">🗑️</button>
      </td>
    `;

    cartItemsList.appendChild(row);
  });

  // Обновляем общую стоимость
  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  document.querySelector(".cart-summary p:first-child").textContent = `${totalCost.toLocaleString()} ₽`;
}

// Функция обновления количества товаров
function updateQuantity(productId, action) {
  const item = cart.find(i => i.id === productId);

  if (action === "increase") {
    item.quantity += 1;
  } else if (action === "decrease" && item.quantity > 1) {
    item.quantity -= 1;
  }

  if (item.quantity === 0) {
    removeItemFromCart(productId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Функция удаления товара из корзины
function removeItemFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Функция инициализации
function init() {
  renderProducts();

  // Обработчик кликов на кнопки "Купить в 1 клик"
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.id);
      addToCart(productId);
    });
  });

  // Обработчик изменения количества товаров
  document.querySelectorAll(".quantity-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      updateQuantity(productId, action);
    });
  });

  // Обработчик удаления товаров
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.id);
      removeItemFromCart(productId);
    });
  });

  // Отображение корзины при загрузке страницы
  renderCart();
}

// Запуск приложения
init();