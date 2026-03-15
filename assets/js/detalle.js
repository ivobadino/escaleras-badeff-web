// Catálogo simulado en memoria
const productosDb = {
  // Paralelas Simples
  'paralela-simple-alu': {
    titulo: 'Paralela Simple de Aluminio',
    categoria: 'Paralelas y Extensibles',
    descripcionCorta: 'Escalera paralela simple de uso industrial/profesional fabricada íntegramente en aluminio.',
    descripcionLarga: `
      <p>Nuestra <strong>Escalera Paralela Simple de Aluminio</strong> está diseñada para ofrecer máxima resistencia y ligereza. Es ideal para trabajos en altura que requieran movilidad constante.</p>
      <ul>
        <li>Fabricada con aleación de aluminio de alta resistencia estructural.</li>
        <li>Tacos de goma antideslizantes para mayor seguridad.</li>
        <li>Peldaños planos estriados para un apoyo seguro del pie.</li>
        <li>Liviana y fácil de transportar.</li>
      </ul>
    `,
    imagenes: [
      'https://via.placeholder.com/600x600/eeeeee/888888?text=Paralela+Simple+Alu+1',
      'https://via.placeholder.com/600x600/eeeeee/888888?text=Paralela+Simple+Alu+2',
      'https://via.placeholder.com/600x600/eeeeee/888888?text=Paralela+Simple+Alu+3'
    ],
    especificaciones: {
      'Material': 'Aluminio',
      'Peldaño': 'Plano estriado',
      'Uso': 'Profesional / Industrial',
      'Carga Máxima': '130 kg'
    }
  },
  'tijera-pintor-alu': {
    titulo: 'Tijera Pintor (Aluminio)',
    categoria: 'Tijeras',
    descripcionCorta: 'Escalera tipo tijera clásica, liviana y resistente, especial para tareas de pintura y mantenimiento en el hogar.',
    descripcionLarga: `
      <p>La <strong>Escalera Tijera Pintor</strong> posee un diseño clásico en forma de A. Permite el apoyo de herramientas o latas de pintura en su bandeja superior plástica integrada (opcional).</p>
      <p>Sus bisagras cincadas y refuerzos brindan una excelente estabilidad lateral, haciéndola segura en superficies planas.</p>
    `,
    imagenes: [
      'https://via.placeholder.com/600x600/eeeeee/888888?text=Tijera+Pintor+Alu+1',
      'https://via.placeholder.com/600x600/eeeeee/888888?text=Tijera+Pintor+Alu+2'
    ],
    especificaciones: {
      'Material': 'Aluminio',
      'Peldaño': 'Plano D',
      'Carga Máxima': '110 kg'
    }
  },
  // Default en caso de no estar en el dict pero detectada por js
  'default': {
    titulo: 'Producto BADEFF',
    categoria: 'Escalera',
    descripcionCorta: 'Escalera de alta calidad marca BADEFF. Consulta para más detalles técnicos.',
    descripcionLarga: '<p>Este producto cumple con los altos estándares de seguridad y resistencia de toda nuestra línea BADEFF. Ideal para trabajos profesionales y de mantenimiento.</p>',
    imagenes: [
      'https://via.placeholder.com/600x600/eeeeee/888888?text=Producto+BADEFF'
    ],
    especificaciones: {
      'Marca': 'BADEFF',
      'Garantía': '1 Año'
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Obtener ID del querystring
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id');
  
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error-message');
  const contentEl = document.getElementById('product-content');

  // Validate
  if (!productId) {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    return;
  }

  // Find info (or use default placeholder logic if not filled to save space)
  let product = productosDb[productId];
  if (!product) {
    // Generar dinámicamente si no está en config hardcodeada
    product = { ...productosDb['default'] };
    // capitalizar ID
    const titleFromId = productId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    product.titulo = titleFromId;
    product.imagenes = [
      `https://via.placeholder.com/600x600/efefef/555?text=${encodeURIComponent(titleFromId)}`,
      `https://via.placeholder.com/600x600/e0e0e0/555?text=Detalle+1`,
      `https://via.placeholder.com/600x600/d0d0d0/555?text=Detalle+2`
    ];
  }

  // Populate UI
  document.title = `${product.titulo} | BADEFF`;
  document.getElementById('bc-title').textContent = product.titulo;
  document.getElementById('detail-title').textContent = product.titulo;
  document.getElementById('detail-category').textContent = product.categoria;
  document.getElementById('detail-short-desc').textContent = product.descripcionCorta;
  document.getElementById('detail-long-desc').innerHTML = product.descripcionLarga;

  // Carrito integration 
  const addCartBtn = document.getElementById('btn-add-cart');
  // Atachear data al boton asi el cart.js lo toma
  addCartBtn.setAttribute('data-product-title', product.titulo);

  addCartBtn.addEventListener('click', () => {
    // Si la integracion de cart.js global espera clics en .btn-carrito de cards...
    // Aquí invocaremos la de cart.js indirectamente simulando 
    // pero ya está usando Event Delegation globalmente en ".btn-carrito"!!
    // Asi que soló configuramos el card padre
  });

  // Wsp Button action
  const msg = `¡Hola! Me gustaría recibir asesoramiento sobre la escalera: *${product.titulo}*.`;
  document.getElementById('btn-wsp').addEventListener('click', () => {
    window.open(`https://wa.me/5491165255083?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // Specs
  const specsList = document.getElementById('quick-specs');
  for (let key in product.especificaciones) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${key}</strong> <span>${product.especificaciones[key]}</span>`;
    specsList.appendChild(li);
  }

  // Galeria
  const mainImg = document.getElementById('main-product-img');
  const thumbContainer = document.getElementById('thumbnail-container');
  
  if(product.imagenes.length > 0) {
    mainImg.src = product.imagenes[0];
    
    product.imagenes.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.classList.add('thumbnail');
      if(idx === 0) img.classList.add('active');
      
      img.addEventListener('click', () => {
        mainImg.src = src;
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        img.classList.add('active');
      });
      thumbContainer.appendChild(img);
    });
  }

  // Calculadora de Altura
  const stepType = product.especificaciones && product.especificaciones['Peldaño'] 
                   ? product.especificaciones['Peldaño'].toLowerCase() 
                   : '';
  
  const stepInput = document.getElementById('step-count');
  const metersOutput = document.getElementById('calc-meters');
  const feetOutput = document.getElementById('calc-feet');
  const calcWarning = document.getElementById('calc-warning');

  // Determinar maximo segun tipo de peldaño
  let maxSteps = 18; // Default plano
  if (stepType.includes('d')) {
    maxSteps = 22;
  }
  stepInput.setAttribute('max', maxSteps);

  if(stepInput) {
    stepInput.addEventListener('input', () => {
      let steps = parseInt(stepInput.value);
      calcWarning.style.display = 'none';

      if (isNaN(steps) || stepInput.value === '') {
        metersOutput.textContent = '- m';
        feetOutput.textContent = '- ft';
        return;
      }

      let calcSteps = steps;
      if (steps < 3) {
        calcWarning.textContent = 'El mínimo de peldaños es 3.';
        calcWarning.style.display = 'block';
        calcSteps = 3; 
      } else if (steps > maxSteps) {
        calcWarning.textContent = `El máximo para esta escalera es ${maxSteps} peldaños.`;
        calcWarning.style.display = 'block';
        calcSteps = maxSteps;
      }

      const altitudeMeters = calcSteps * 0.30;
      const altitudeFeet = altitudeMeters * 3.28084;
      
      metersOutput.textContent = altitudeMeters.toFixed(2) + ' m';
      feetOutput.textContent = altitudeFeet.toFixed(2) + ' ft';
    });
  }

  // Muestro Contenido
  loadingEl.style.display = 'none';
  contentEl.style.display = 'block';
});
