import re

with open('productos.html', 'r', encoding='utf-8') as f:
    html = f.read()

def replacer(match):
    attrs = match.group(1)
    body = match.group(2)
    
    title_match = re.search(r'<h2 class="product-title">(.*?)</h2>', body)
    title = title_match.group(1) if title_match else "Escalera"
    
    img_tag = f'<img class="product-img" src="https://via.placeholder.com/400x210/eeeeee/888888?text={title.replace(" ", "+")}" alt="{title}" loading="lazy" />'
    
    button_tag = '<button class="btn btn-secondary btn-carrito" style="width: 100%; margin-top: 15px;" onclick="alert(\\\'Producto agregado al carrito\\\')"><svg class="cart-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> Agregar al carrito</button>'
    
    return f'<article {attrs}>\n            {img_tag}\n            {body}\n            {button_tag}\n          </div>\n          </article>'

new_html = re.sub(r'<article (class="card product-card".*?)>(<div class="product-body">.*?)</div></article>', replacer, html)

with open('productos.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Modificaciones aplicadas con exito.")
