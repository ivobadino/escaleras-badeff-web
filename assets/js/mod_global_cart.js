const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/badin/Desktop/BADEFF';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');

  // Remove old modal and FAB from productos.html if it exists
  const modalRegex = /<!-- Carrito Modal -->[\s\S]*?<\/style>/;
  if (modalRegex.test(html)) {
    html = html.replace(modalRegex, '');
  }

  // Ensure cart.js is included right after script.js or before </body>
  if (!html.includes('cart.js')) {
    html = html.replace(/<script src="script\.js"><\/script>/, '<script src="script.js"></script>\n  <script src="cart.js"></script>');
  }

  fs.writeFileSync(fp, html, 'utf8');
  console.log(`Actualizado ${file}`);
});
