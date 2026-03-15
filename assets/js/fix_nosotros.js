const fs = require('fs');
let html = fs.readFileSync('c:/Users/badin/Desktop/BADEFF/nosotros.html', 'utf8');

// The place where the cut starts is at: <p>Producimos con procesos controlados y materiales seleccionados para máxima vida útil.</p>
const cutMarker = '<p>Producimos con procesos controlados y materiales seleccionados para máxima vida útil.</p>';
const idx = html.indexOf(cutMarker);

if (idx !== -1) {
  const goodHtml = html.substring(0, idx + cutMarker.length);
  const correctEnding = `
          </article>
          <article class="card benefit-card">
            <h3>3. Entrega y soporte</h3>
            <p>Coordinamos entrega y brindamos recomendaciones para uso y mantenimiento seguro.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Nueva seccion: Red (Distribuidores y Proveedores) -->
    <section class="section" style="background-color: var(--light-color); padding: 60px 0;">
      <div class="container">
        <h2 class="section-title">Nuestra Red Comercial</h2>
        <p class="section-subtitle" style="margin-bottom: 40px;">
          Trabajamos junto a grandes aliados para llevar nuestra calidad a todo el país.
        </p>
        
        <div class="info-grid">
          <!-- Distribuidores -->
          <article class="card" style="padding:30px; border-top: 4px solid var(--primary-color);">
            <h3 class="section-title" style="font-size:1.35rem; margin-bottom: 20px; text-align: left;">Nuestros Distribuidores</h3>
            <p style="color: #555; margin-bottom: 20px; line-height: 1.6;">
              Contamos con una amplia red de distribuidores oficiales autorizados. Podés encontrar los productos BADEFF en las principales ferreterías industriales y comercios especializados de tu zona.
            </p>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
              <div style="background: #f4f4f4; padding: 15px 20px; border-radius: 6px; font-weight: 600; color: #444; flex: 1; text-align: center; min-width: 120px;">Corralón A</div>
              <div style="background: #f4f4f4; padding: 15px 20px; border-radius: 6px; font-weight: 600; color: #444; flex: 1; text-align: center; min-width: 120px;">Ferretería B</div>
              <div style="background: #f4f4f4; padding: 15px 20px; border-radius: 6px; font-weight: 600; color: #444; flex: 1; text-align: center; min-width: 120px;">Distribuidora C</div>
            </div>
          </article>

          <!-- Proveedores -->
          <article class="card" style="padding:30px; border-top: 4px solid var(--primary-color);">
            <h3 class="section-title" style="font-size:1.35rem; margin-bottom: 20px; text-align: left;">Nuestros Proveedores</h3>
            <p style="color: #555; margin-bottom: 20px; line-height: 1.6;">
              Elegimos materias primas de primera calidad. Trabajamos con empresas líderes en extrusión de aluminio, fibra de vidrio y piezas técnicas para garantizar la máxima seguridad en nuestras escaleras.
            </p>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
              <div style="background: #f4f4f4; padding: 15px 20px; border-radius: 6px; font-weight: 600; color: #444; flex: 1; text-align: center; min-width: 120px;">Aluminio X</div>
              <div style="background: #f4f4f4; padding: 15px 20px; border-radius: 6px; font-weight: 600; color: #444; flex: 1; text-align: center; min-width: 120px;">Fibra Y</div>
              <div style="background: #f4f4f4; padding: 15px 20px; border-radius: 6px; font-weight: 600; color: #444; flex: 1; text-align: center; min-width: 120px;">Herrajes Z</div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container site-footer-inner">
      <div class="footer-title">BADEFF</div>
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Contacto</h4>
          <p>Email: <a href="mailto:info@badeff.com" style="color:#ffcc00;">info@badeff.com</a></p>
          <p>Tel: +54 11 1234-5678</p>
          <p>Dirección: Calle Falsa 123, CABA</p>
        </div>
        <div class="footer-col">
          <h4>Redes Sociales</h4>
          <p><a href="#" style="color:#ffcc00;">Instagram</a></p>
          <p><a href="#" style="color:#ffcc00;">Facebook</a></p>
        </div>
        <div class="footer-col">
          <h4>Legales</h4>
          <p><a href="#" style="color:#ffcc00;">Términos y condiciones</a></p>
          <p><a href="#" style="color:#ffcc00;">Política de privacidad</a></p>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 0.85rem; color: #777;">
        &copy; 2026 BADEFF. Todos los derechos reservados.
      </div>
    </div>
  </footer>

  <script src="script.js"></script>
  <script src="cart.js"></script>
</body>
</html>
`;
  
  fs.writeFileSync('c:/Users/badin/Desktop/BADEFF/nosotros.html', goodHtml + correctEnding, 'utf8');
}
