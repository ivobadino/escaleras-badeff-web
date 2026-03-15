# TODO - Flujo de cuenta y panel de usuario BADEFF

- [x] Unificar Contacto y Postventa en una sola página (`contacto.html`) con selector de tipo de solicitud.
- [x] Hacer funcionales "Iniciar sesión" y "Registrarse" con redirección a `cuenta.html?tab=login|registro`.
- [x] Eliminar Cotizar como flujo independiente y dejar redirección de compatibilidad (`cotizar.html` -> `contacto.html`).
- [x] Redirigir `postventa.html` a `contacto.html?tipo=postventa`.
- [x] Estandarizar barra de navegación (header) en todas las páginas principales.
- [x] Estandarizar navegación de footer en todas las páginas principales.

## Nueva iteración (solicitada)
- [x] Guardar sesión frontend al registrarse/iniciar sesión (`localStorage`).
- [x] Renderizar auth del header dinámicamente (mostrar "Mi cuenta" si hay sesión).
- [x] Crear `mi-cuenta.html` con secciones "Mis pedidos" y "Mis consultas".
- [x] Implementar cierre de sesión desde `mi-cuenta.html`.
- [x] Guardar consultas/contactos enviadas desde `contacto.html` en historial local.
- [x] Mostrar historial en `mi-cuenta.html`.
- [x] Ejecutar apertura local de `index.html` para validación final.

## Ajuste UX contacto/postventa (actual)
- [x] Centrar horizontalmente el selector de tipo de solicitud.
- [x] Agregar texto explicativo entre selector y formularios.
- [x] Mostrar texto dinámico según tipo: contacto o postventa.
- [x] Validar visualmente en `contacto.html` y `contacto.html?tipo=postventa`.
