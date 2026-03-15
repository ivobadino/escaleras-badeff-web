// --- LÓGICA DE CARRITO BADEFF ---
(function () {
  const CART_STORAGE_KEY = 'badeffCart';
  let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');

  let cartModalEl = document.getElementById('cart-modal');
  if (!cartModalEl) {
    const modalHTML = `
      <div id="cart-modal" class="cart-modal" aria-hidden="true">
        <div class="cart-modal-content card">
          <button id="close-cart" class="close-btn" aria-label="Cerrar carrito">&times;</button>
          <h2 style="font-family: 'Montserrat', sans-serif; margin-top: 0; color: #111;">MI CARRITO</h2>
          <ul id="cart-items" class="cart-items-list"></ul>
          <div class="cart-actions">
            <h3 style="margin-bottom: 5px; font-size: 1.1rem; color: #444;">Para finalizar solicitud de compra seleccione:</h3>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
              <button id="checkout-whatsapp" class="btn btn-primary" style="flex: 1; background: #25D366; color: white;">WhatsApp</button>
              <button id="checkout-email" class="btn btn-secondary" style="flex: 1;">Email</button>
            </div>
          </div>
        </div>
      </div>
      <style>
        .cart-modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center; padding: 20px; }
        .cart-modal.open { display: flex; }
        .cart-modal-content { width: 100%; max-width: 500px; padding: 24px; position: relative; max-height: 90vh; display: flex; flex-direction: column; }
        .close-btn { position: absolute; top: 15px; right: 15px; background: transparent; border: none; font-size: 1.8rem; cursor: pointer; line-height: 1; color: #111;}
        .cart-items-list { list-style: none; padding: 0; margin: 15px 0; flex-grow: 1; overflow-y: auto; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
        .cart-items-list li { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee; color: #111; }
        .cart-items-list li:last-child { border-bottom: none; }
      </style>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const cartFab = document.getElementById('cart-fab');
  const cartBadge = document.getElementById('cart-badge');
  const cartModal = document.getElementById('cart-modal');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsList = document.getElementById('cart-items');
  const checkoutWsBtn = document.getElementById('checkout-whatsapp');
  const checkoutEmailBtn = document.getElementById('checkout-email');

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
  }

  function updateQuantity(title, meta, delta) {
    const item = cart.find(i => i.title === title && i.meta === meta);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        cart = cart.filter(i => !(i.title === title && i.meta === meta));
      }
    } else if (delta > 0) {
      cart.push({ title, meta, quantity: delta });
    }
    saveCart();
  }

  function syncProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.querySelector('.product-title').textContent;
      const meta = card.querySelector('.product-meta').textContent;
      const item = cart.find(i => i.title === title && i.meta === meta);
      
      let controlsEl = card.querySelector('.card-qty-controls');
      let addBtn = card.querySelector('.btn-carrito');
      
      if (item) {
        if (!controlsEl) {
          controlsEl = document.createElement('div');
          controlsEl.className = 'card-qty-controls';
          controlsEl.style = "display: flex; align-items: center; justify-content: space-between; margin-top: 15px; background: #f1f1f1; border-radius: 999px; padding: 5px 8px;";
          controlsEl.innerHTML = `
            <button class="qty-btn card-minus" aria-label="Restar" style="border:none; width:36px; height:36px; border-radius:50%; background:#fff; cursor:pointer; font-weight:bold; font-size:1.2rem; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 4px rgba(0,0,0,0.1);">-</button>
            <span class="card-qty-val" style="font-weight:900; font-size:1.1rem; color:#111;">${item.quantity}</span>
            <button class="qty-btn card-plus" aria-label="Sumar" style="border:none; width:36px; height:36px; border-radius:50%; background:#111; color:#fff; cursor:pointer; font-weight:bold; font-size:1.2rem; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 4px rgba(0,0,0,0.2);">+</button>
          `;
          card.querySelector('.product-body').appendChild(controlsEl);
          
          controlsEl.querySelector('.card-minus').addEventListener('click', (e) => { e.preventDefault(); updateQuantity(title, meta, -1); });
          controlsEl.querySelector('.card-plus').addEventListener('click', (e) => { e.preventDefault(); updateQuantity(title, meta, 1); });
        } else {
          controlsEl.style.display = 'flex';
          controlsEl.querySelector('.card-qty-val').textContent = item.quantity;
        }
        if (addBtn) addBtn.style.display = 'none';
      } else {
        if (controlsEl) controlsEl.style.display = 'none';
        if (addBtn) addBtn.style.display = 'block';
      }
    });
  }

  function updateCartUI() {
    if (cartBadge) {
      cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    if (cartItemsList) {
      cartItemsList.innerHTML = '';
      if (cart.length === 0) {
        cartItemsList.innerHTML = '<li style="justify-content:center; color:#666;">El carrito está vacío.</li>';
      } else {
        cart.forEach((item) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <div>
              <strong>${item.title}</strong><br/>
              <small>${item.meta}</small>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="display:flex; align-items:center; background:#f5f5f5; border-radius:999px; padding:4px;">
                <button class="cart-minus" data-title="${item.title}" data-meta="${item.meta}" style="border:none; width:28px; height:28px; border-radius:50%; background:#fff; cursor:pointer; font-weight:bold; font-size:1rem; box-shadow:0 1px 3px rgba(0,0,0,0.1);">-</button>
                <span style="width:28px; text-align:center; font-weight:900; font-size:1rem; color:#111;">${item.quantity}</span>
                <button class="cart-plus" data-title="${item.title}" data-meta="${item.meta}" style="border:none; width:28px; height:28px; border-radius:50%; background:#111; color:#fff; cursor:pointer; font-weight:bold; font-size:1rem;">+</button>
              </div>
              <button class="cart-remove-btn" aria-label="Eliminar" data-title="${item.title}" data-meta="${item.meta}" style="background:transparent; font-size:1.2rem; padding:4px;">🗑️</button>
            </div>
          `;
          cartItemsList.appendChild(li);
        });
      }
    }
    syncProductCards();
  }

  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const title = btn.getAttribute('data-title');
      const meta = btn.getAttribute('data-meta');
      
      if (btn.classList.contains('cart-remove-btn')) {
        cart = cart.filter(i => !(i.title === title && i.meta === meta));
        saveCart();
      } else if (btn.classList.contains('cart-minus')) {
        updateQuantity(title, meta, -1);
      } else if (btn.classList.contains('cart-plus')) {
        updateQuantity(title, meta, 1);
      }
    });
  }

  document.body.addEventListener('click', (e) => {
    let addBtn = e.target.closest('.btn-carrito');
    if (addBtn) {
      e.preventDefault();
      const card = addBtn.closest('.product-card');
      if (card) {
        const title = card.querySelector('.product-title').textContent;
        const meta = card.querySelector('.product-meta').textContent;
        updateQuantity(title, meta, 1);
      }
    }
  });

  if (cartFab && cartModal && closeCartBtn) {
    cartFab.addEventListener('click', () => {
      cartModal.classList.add('open');
      updateCartUI();
    });

    closeCartBtn.addEventListener('click', () => {
      cartModal.classList.remove('open');
    });

    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) cartModal.classList.remove('open');
    });
  }

  function buildCheckoutText() {
    let text = 'Hola, BADEFF! Me gustaría consultar/pedir cotización de los siguientes productos de mi carrito:\n\n';
    cart.forEach(item => {
      text += `- ${item.quantity}x ${item.title} (${item.meta})\n`;
    });
    text += '\n¡Aguardoo su respuesta!';
    return text;
  }

  if (checkoutWsBtn && checkoutEmailBtn) {
    checkoutWsBtn.addEventListener('click', () => {
      if (cart.length === 0) return alert('El carrito está vacío');
      const text = encodeURIComponent(buildCheckoutText());
      window.open(`https://wa.me/5491165255083?text=${text}`, '_blank');
    });

    checkoutEmailBtn.addEventListener('click', () => {
       if (cart.length === 0) return alert('El carrito está vacío');
       const subject = encodeURIComponent('Consulta de pedido web BADEFF');
       const body = encodeURIComponent(buildCheckoutText());
       window.location.href = `mailto:badeffesc@yahoo.com.ar?subject=${subject}&body=${body}`;
    });
  }

  updateCartUI();
})();
