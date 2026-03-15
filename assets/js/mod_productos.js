const fs = require('fs');

try {
  let html = fs.readFileSync('productos.html', 'utf8');

  const regex = /<article (class="card product-card".*?)>(<div class="product-body">.*?)<\/div><\/article>/g;

  let count = 0;
  html = html.replace(regex, (match, attrs, body) => {
    count++;
    let titleMatch = body.match(/<h2 class="product-title">(.*?)<\/h2>/);
    let title = titleMatch ? titleMatch[1] : 'Escalera';
    let encodedTitle = title.replace(/ /g, '+');
    
    let imgTag = `<img src="https://images.unsplash.com/photo-1542157585-ef20bbcce178?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="${title}" loading="lazy" />`;
    
    // As per user request, we'll use an image placeholder that looks like a product. Placeholder.com might feel a bit generic. Unsplash works for generic industrial stuff, or placeholder.
    imgTag = `<img src="https://via.placeholder.com/400x210/eeeeee/888888?text=${encodedTitle}" alt="${title}" loading="lazy" />`;
    
    let buttonTag = `<button class="btn btn-secondary btn-carrito" style="width: 100%; margin-top: 15px;" onclick="alert('Producto agregado al carrito')"><svg class="cart-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> Agregar al carrito</button>`;
    
    return `<article ${attrs}>\n            ${imgTag}\n            ${body}\n            ${buttonTag}\n          </div>\n          </article>`;
  });

  fs.writeFileSync('productos.html', html, 'utf8');
  console.log(`Modificaciones aplicadas con exito. ${count} productos actualizados.`);
} catch (e) {
  console.error(e);
}
