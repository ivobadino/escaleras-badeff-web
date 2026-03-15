const fs = require('fs');
const files = ['index.html', 'productos.html', 'nosotros.html', 'contacto.html', 'producto-detalle.html'];

const template = `  <footer class="site-footer">
    <div class="container site-footer-inner">
      <div class="footer-title">BADEFF</div>
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Contacto</h4>
          <a href="mailto:info@badeff.com" class="footer-link">
            <svg class="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            info@badeff.com
          </a>
          <span class="footer-link">
            <svg class="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +54 11 1234-5678
          </span>
          <span class="footer-link">
            <svg class="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Dirección
          </span>
        </div>
        <div class="footer-col">
          <h4>Navegación</h4>
          <a href="index.html" class="footer-link">Inicio</a>
          <a href="productos.html" class="footer-link">Productos</a>
          <a href="nosotros.html" class="footer-link">Nosotros</a>
          <a href="contacto.html" class="footer-link">Contacto</a>
        </div>
        <div class="footer-col">
          <h4>Redes Sociales</h4>
          <a href="#" class="footer-link">
            <svg class="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            Instagram
          </a>
          <a href="#" class="footer-link">
            <svg class="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            Facebook
          </a>
          <a href="https://wa.me/5491100000000" class="footer-link">
            <svg class="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            WhatsApp
          </a>
        </div>
      </div>
      <div class="footer-copyright">
        &copy; 2026 BADEFF. Todos los derechos reservados.
      </div>
    </div>
  </footer>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const regex = /<footer class="site-footer">[\s\S]*?<\/footer>/;
  if (regex.test(content)) {
    content = content.replace(regex, template);
    fs.writeFileSync(f, content);
    console.log("Updated footer on", f);
  } else {
    console.log("Footer not found in", f);
  }
});
