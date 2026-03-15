(function () {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }
})();

(function () {
  const headerAuth = document.querySelector('.header-auth');
  if (!headerAuth) return;

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('badeffUser') || 'null');
  } catch (e) {
    user = null;
  }

  const cartIcon = `
    <button id="cart-fab" class="cart-nav-btn" aria-label="Abrir carrito" style="position:relative; background:transparent; border:none; cursor:pointer; color:#fff; display:flex; align-items:center; padding:0; margin-left:10px;">
      <svg class="cart-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      <span id="cart-badge" class="cart-badge" style="position:absolute; top:-6px; right:-10px; background:#e74c3c; color:white; font-size:0.75rem; font-weight:bold; width:18px; height:18px; display:flex; align-items:center; justify-content:center; border-radius:50%;">0</span>
    </button>
  `;

  if (user && user.email) {
    headerAuth.innerHTML = `<a href="mi-cuenta.html" class="auth-btn">Mi cuenta</a>` + cartIcon;
  } else {
    headerAuth.innerHTML = `
      <a href="cuenta.html?tab=login" class="auth-btn">Iniciar sesión</a>
      <a href="cuenta.html?tab=registro" class="auth-btn">Registrarse</a>
    ` + cartIcon;
  }
})();

(function () {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const slides = carousel.querySelector('.slides');
  const slideItems = carousel.querySelectorAll('.slide');
  const indicators = carousel.querySelectorAll('.indicator');
  const prevBtn = carousel.querySelector('[data-prev]');
  const nextBtn = carousel.querySelector('[data-next]');
  const total = slideItems.length;
  let index = 0;

  function update() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      update();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % total;
      update();
    });
  }

  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      update();
    });
  });

  setInterval(() => {
    index = (index + 1) % total;
    update();
  }, 5000);
})();

(function () {
  const materialButtons = document.querySelectorAll('[data-filter-material]');
  const stepButtons = document.querySelectorAll('[data-filter-step]');
  const familyButtons = document.querySelectorAll('[data-filter-family]');
  const cards = document.querySelectorAll('[data-product-card]');
  if (!cards.length) return;

  let activeMaterial = 'todos';
  let activeStep = 'todos';
  let activeFamily = 'todos';

  const familyGroups = {
    'tijera': ['tijera-pintor', 'tijera-industrial', 'tijera-con-plataforma', 'tijera-con-extencion'],
    'paralela': ['paralela-simple', 'extensible-2-hojas', 'extensible-3-hojas'],
    'plataforma': ['plataforma-doble-acceso', 'plataforma-acceso-simple', 'plataforma-burro'],
    'tres-en-uno': ['tres-en-uno'],
    'especiales': ['especial-1', 'especial-2', 'especial-3', 'especial-4']
  };

  function applyFilters() {
    cards.forEach((card) => {
      const material = card.getAttribute('data-material') || '';
      const family = card.getAttribute('data-family') || '';
      const metaText = (card.querySelector('.product-meta')?.textContent || '').toLowerCase();
      
      let stepType = 'otro';
      if (metaText.includes('peldaño d')) stepType = 'D';
      if (metaText.includes('peldaño plano')) stepType = 'plano';

      const materialMatch = activeMaterial === 'todos' || material === activeMaterial;
      const stepMatch = activeStep === 'todos' || stepType === activeStep;
      
      let resolvedFamilies = familyGroups[activeFamily];
      if (!resolvedFamilies && activeFamily !== 'todos') {
        resolvedFamilies = [activeFamily];
      }
      const familyMatch = activeFamily === 'todos' || resolvedFamilies.includes(family);

      card.style.display = (materialMatch && stepMatch && familyMatch) ? '' : 'none';
    });
  }

  materialButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeMaterial = btn.getAttribute('data-filter-material') || 'todos';
      materialButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeStep = btn.getAttribute('data-filter-step') || 'todos';
      stepButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  familyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFamily = btn.getAttribute('data-filter-family') || 'todos';
      familyButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  // Agregar redirección a la vista de detalle
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-carrito')) return;

      const family = card.getAttribute('data-family') || '';
      const material = card.getAttribute('data-material') || '';
      const productId = family === 'especiales' ? 'default' : (family + (material ? '-' + material : ''));

      window.location.href = `producto-detalle.html?id=${productId}`;
    });
  });

  applyFilters();
})();

(function () {
  const accountTabs = document.querySelectorAll('[data-account-tab]');
  const accountPanels = document.querySelectorAll('[data-account-panel]');
  const accountAlert = document.querySelector('[data-account-alert]');

  if (accountTabs.length && accountPanels.length) {
    const query = new URLSearchParams(window.location.search);
    const initial = query.get('tab') === 'registro' ? 'registro' : 'login';

    function activate(tab) {
      accountTabs.forEach((btn) => {
        const active = btn.getAttribute('data-account-tab') === tab;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      accountPanels.forEach((panel) => {
        const show = panel.getAttribute('data-account-panel') === tab;
        panel.hidden = !show;
      });
    }

    accountTabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-account-tab');
        activate(tab);
      });
    });

    activate(initial);

    const loginForm = document.querySelector('[data-login-form]');
    const registerForm = document.querySelector('[data-register-form]');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[name="email"]')?.value?.trim().toLowerCase() || '';
        const password = loginForm.querySelector('input[name="password"]')?.value || '';

        if (!email || !password) {
          if (accountAlert) {
            accountAlert.textContent = 'Completá email y contraseña.';
            accountAlert.classList.remove('ok');
          }
          return;
        }

        const accounts = JSON.parse(localStorage.getItem('badeffAccounts') || '[]');
        const account = accounts.find((a) => (a.email || '').toLowerCase() === email);

        if (!account) {
          if (accountAlert) {
            accountAlert.textContent = 'No existe una cuenta con ese email. Primero registrate.';
            accountAlert.classList.remove('ok');
          }
          return;
        }

        if (account.password !== password) {
          if (accountAlert) {
            accountAlert.textContent = 'Contraseña incorrecta.';
            accountAlert.classList.remove('ok');
          }
          return;
        }

        const user = { fullName: account.fullName || '', email: account.email };
        localStorage.setItem('badeffUser', JSON.stringify(user));

        if (accountAlert) {
          accountAlert.textContent = 'Inicio de sesión correcto.';
          accountAlert.classList.add('ok');
        }

        setTimeout(() => {
          window.location.href = 'mi-cuenta.html';
        }, 500);
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = registerForm.querySelector('input[name="fullName"]')?.value?.trim() || '';
        const emailRaw = registerForm.querySelector('input[name="email"]')?.value?.trim() || '';
        const email = emailRaw.toLowerCase();
        const pass = registerForm.querySelector('input[name="password"]')?.value || '';
        const confirm = registerForm.querySelector('input[name="confirmPassword"]')?.value || '';

        if (!fullName || !email) {
          if (accountAlert) {
            accountAlert.textContent = 'Completá nombre y email.';
            accountAlert.classList.remove('ok');
          }
          return;
        }

        if (pass.length < 6) {
          if (accountAlert) {
            accountAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            accountAlert.classList.remove('ok');
          }
          return;
        }

        if (pass !== confirm) {
          if (accountAlert) {
            accountAlert.textContent = 'Las contraseñas no coinciden.';
            accountAlert.classList.remove('ok');
          }
          return;
        }

        const accounts = JSON.parse(localStorage.getItem('badeffAccounts') || '[]');
        const exists = accounts.some((a) => (a.email || '').toLowerCase() === email);

        if (exists) {
          if (accountAlert) {
            accountAlert.textContent = 'Ya existe una cuenta con ese email.';
            accountAlert.classList.remove('ok');
          }
          return;
        }

        const newAccount = { fullName, email, password: pass };
        accounts.push(newAccount);
        localStorage.setItem('badeffAccounts', JSON.stringify(accounts));

        const user = { fullName, email };
        localStorage.setItem('badeffUser', JSON.stringify(user));

        if (accountAlert) {
          accountAlert.textContent = 'Cuenta creada con éxito.';
          accountAlert.classList.add('ok');
        }

        setTimeout(() => {
          window.location.href = 'mi-cuenta.html';
        }, 500);
      });
    }
  }
})();

(function () {
  const typeSelect = document.querySelector('[data-contact-type]');
  const blocks = document.querySelectorAll('[data-contact-block]');
  const infoText = document.querySelector('[data-contact-info-text]');

  if (!typeSelect || !blocks.length) return;

  function syncView(type) {
    blocks.forEach((block) => {
      const isMatch = block.getAttribute('data-contact-block') === type;
      block.hidden = !isMatch;
      block.style.display = isMatch ? '' : 'none';
    });
    typeSelect.value = type;

    if (infoText) {
      infoText.textContent =
        type === 'postventa'
          ? 'Usá este formulario para consultas de mantenimiento, garantía, repuestos, recomendaciones de uso seguro y soporte técnico postventa.'
          : 'Usá este formulario para consultas de precios, asesoría de productos, disponibilidad, tiempos de entrega y dudas generales.';
    }
  }

  const user = JSON.parse(localStorage.getItem('badeffUser') || 'null');
  if (user) {
    const nameInputs = document.querySelectorAll('[data-autofill-name]');
    const emailInputs = document.querySelectorAll('[data-autofill-email]');

    nameInputs.forEach((input) => {
      if (!input.value && user.fullName) input.value = user.fullName;
    });

    emailInputs.forEach((input) => {
      if (!input.value && user.email) input.value = user.email;
    });
  }

  const query = new URLSearchParams(window.location.search);
  const initialType = query.get('tipo') === 'postventa' ? 'postventa' : 'contacto';
  syncView(initialType);

  const contactNavLink = document.querySelector('a[href="contacto.html"]');
  const postventaNavLink = document.querySelector('a[href="contacto.html?tipo=postventa"]');

  function syncNavByType(type) {
    if (!contactNavLink || !postventaNavLink) return;
    const isPostventa = type === 'postventa';
    contactNavLink.classList.toggle('active', !isPostventa);
    postventaNavLink.classList.toggle('active', isPostventa);
  }

  syncNavByType(initialType);

  typeSelect.addEventListener('change', () => {
    const type = typeSelect.value;
    syncView(type);
    syncNavByType(type);
  });

  const forms = document.querySelectorAll('[data-contact-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const type = form.getAttribute('data-form-type') || 'contacto';
      const user = JSON.parse(localStorage.getItem('badeffUser') || 'null');
      const entries = JSON.parse(localStorage.getItem('badeffConsultas') || '[]');

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      entries.unshift({
        id: Date.now(),
        tipo: type,
        usuario: user?.email || 'invitado',
        fecha: new Date().toLocaleString('es-AR'),
        datos: payload
      });

      localStorage.setItem('badeffConsultas', JSON.stringify(entries));

      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Solicitud guardada correctamente.';
      }

      form.reset();
    });
  });
})();

(function () {
  const panel = document.querySelector('[data-user-panel]');
  if (!panel) return;

  const user = JSON.parse(localStorage.getItem('badeffUser') || 'null');
  const consultas = JSON.parse(localStorage.getItem('badeffConsultas') || '[]');

  const userName = panel.querySelector('[data-user-name]');
  const consultasList = panel.querySelector('[data-consultas-list]');
  const pedidosList = panel.querySelector('[data-pedidos-list]');
  const logoutBtn = panel.querySelector('[data-logout]');

  if (!user) {
    window.location.href = 'cuenta.html?tab=login';
    return;
  }

  if (userName) {
    userName.textContent = user.fullName || user.email || 'Cliente';
  }

  if (pedidosList) {
    pedidosList.innerHTML = `
      <li class="card" style="padding:12px; list-style:none;">
        Aún no hay pedidos cargados en tu cuenta.
      </li>
    `;
  }

  if (consultasList) {
    const mine = consultas.filter((c) => (c.usuario || '').toLowerCase() === (user.email || '').toLowerCase());
    if (!mine.length) {
      consultasList.innerHTML = `
        <li class="card" style="padding:12px; list-style:none;">
          Aún no tenés consultas registradas.
        </li>
      `;
    } else {
      consultasList.innerHTML = mine
        .map(
          (c) => `
            <li class="card" style="padding:12px; list-style:none; margin-bottom:10px;">
              <strong>${c.tipo === 'postventa' ? 'Postventa' : 'Contacto'}</strong><br/>
              <small>${c.fecha}</small><br/>
              <span>${Object.entries(c.datos || {})
                .map(([k, v]) => `${k}: ${v}`)
                .join(' · ')}</span>
            </li>
          `
        )
        .join('');
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('badeffUser');
      window.location.href = 'index.html';
    });
  }
})();


// --- EASTER EGG: Hormigas V4.1 (Cinemática Avanzada) ---
(function() {
  function createAnt() {
    if (window.innerWidth < 300) return;

    const ant = document.createElement('div');
    ant.classList.add('bg-ant');
    
    ant.innerHTML = `
      <svg viewBox="0 0 24 32" width="100%" height="100%">
        <g class="ant-body" fill="#111">
          <path class="ant-leg ant-leg-left" d="M10,11 Q4,9 3,13" />
          <path class="ant-leg ant-leg-right" d="M14,11 Q20,9 21,13" />
          <path class="ant-leg ant-leg-left" d="M10,14 Q3,14 2,19" />
          <path class="ant-leg ant-leg-right" d="M14,14 Q21,14 22,19" />
          <path class="ant-leg ant-leg-left" d="M10,16 Q4,20 4,26" />
          <path class="ant-leg ant-leg-right" d="M14,16 Q20,20 20,26" />
          <circle cx="12" cy="7" r="3" />
          <ellipse cx="12" cy="14" rx="2.5" ry="4.5" />
          <ellipse cx="12" cy="23" rx="4.5" ry="6" />
          <path d="M10,6 Q6,2 8,1" fill="none" stroke="#111" stroke-width="1"/>
          <path d="M14,6 Q18,2 16,1" fill="none" stroke="#111" stroke-width="1"/>
        </g>
      </svg>`;
    
    document.body.appendChild(ant);

    // SPAWNEO TOTALMENTE FUERA (Margen 150px)
    const side = Math.floor(Math.random() * 4); 
    const margin = 150;
    let x, y, tx, ty;

    if (side === 0) { x = Math.random() * window.innerWidth; y = -margin; }
    else if (side === 1) { x = window.innerWidth + margin; y = Math.random() * window.innerHeight; }
    else if (side === 2) { x = Math.random() * window.innerWidth; y = window.innerHeight + margin; }
    else { x = -margin; y = Math.random() * window.innerHeight; }

    // OBJETIVO TOTALMENTE FUERA (Lado opuesto)
    const targetMargin = 200;
    if (side === 0) { tx = Math.random() * window.innerWidth; ty = window.innerHeight + targetMargin; }
    else if (side === 1) { tx = -targetMargin; ty = Math.random() * window.innerHeight; }
    else if (side === 2) { tx = Math.random() * window.innerWidth; ty = -targetMargin; }
    else { tx = window.innerWidth + targetMargin; ty = Math.random() * window.innerHeight; }

    let curX = x, curY = y;
    const steps = 40; // Más pasos para fluidez
    let stepCount = 0;
    const totalDuration = 10000 + Math.random() * 5000; // Más lentas y realistas
    const stepTime = totalDuration / steps;

    function move() {
      if (stepCount >= steps) {
        // Solo remover si realmente salió (doble check)
        const rect = ant.getBoundingClientRect();
        if (rect.right < 0 || rect.left > window.innerWidth || rect.bottom < 0 || rect.top > window.innerHeight) {
          ant.remove();
          return;
        }
        // Si por error de cálculo sigue visible, forzar un par de pasos más
        stepCount = steps - 5; 
      }

      const progress = (stepCount + 1) / steps;
      const baseX = x + (tx - x) * progress;
      const baseY = y + (ty - y) * progress;

      // Movimiento errático pero controlado
      const amp = 40; 
      const nextX = baseX + Math.sin(stepCount * 0.5) * amp;
      const nextY = baseY + Math.cos(stepCount * 0.5) * amp;

      const angle = Math.atan2(nextY - curY, nextX - curX) * (180 / Math.PI) + 90;

      ant.style.transition = `left ${stepTime/1000}s linear, top ${stepTime/1000}s linear, transform 0.2s ease`;
      ant.style.left = `${nextX}px`;
      ant.style.top = `${nextY}px`;
      ant.style.transform = `rotate(${angle}deg)`;

      curX = nextX; curY = nextY;
      stepCount++;
      setTimeout(move, stepTime);
    }

    ant.style.left = `${x}px`;
    ant.style.top = `${y}px`;
    requestAnimationFrame(() => move());
  }

  function schedule() {
    createAnt();
    setTimeout(schedule, 15000);
  }

  setTimeout(schedule, 2000);
})();

