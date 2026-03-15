const fs = require('fs');
const html = fs.readFileSync('c:/Users/badin/Desktop/BADEFF/productos.html', 'utf8');

const correctHeader = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Productos | BADEFF</title>
  <meta name="description" content="Catálogo completo BADEFF de escaleras de aluminio y fibra de vidrio." />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container site-header-inner">
      <button class="nav-toggle" data-nav-toggle aria-label="Abrir menú" aria-expanded="false">☰</button>
      <a class="brand" href="index.html" aria-label="Inicio BADEFF">BADEFF</a>
      <div class="header-auth" aria-label="Acceso de usuario">
        <a href="cuenta.html?tab=login" class="auth-btn">Iniciar sesión</a>
        <a href="cuenta.html?tab=registro" class="auth-btn">Registrarse</a>
      </div>
      <nav class="site-nav" data-nav aria-label="Navegación principal">
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a class="active" href="productos.html">Productos</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="contacto.html">Contacto</a></li>
          <li><a href="contacto.html?tipo=postventa">Postventa</a></li>
        </ul>
      </nav>
    </div>
  </header>`;

const cleanHtml = html.replace(/<!DOCTYPE html>[\s\S]*?<\/header>/, correctHeader);
fs.writeFileSync('c:/Users/badin/Desktop/BADEFF/productos.html', cleanHtml, 'utf8');
