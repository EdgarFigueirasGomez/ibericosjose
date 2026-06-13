/**
 * Ibéricos José — App principal
 * Carrito en memoria + envío de pedido por WhatsApp
 */

const carrito = [];
const cantidades = {}; // id → cantidad seleccionada en la tarjeta

// ── Render productos ──
function renderProductos() {
  const grid = document.getElementById('productosGrid');
  grid.innerHTML = PRODUCTOS.map(p => {
    const qty = cantidades[p.id] || 1;
    const src = imagenProducto(p);
    const esGenerica = !p.imagen;
    return `
      <article class="producto-card${p.destacado ? ' producto-card--destacado' : ''}" data-id="${p.id}">
        <div class="producto-card__imagen${esGenerica ? ' producto-card__imagen--generica' : ''}">
          <img
            src="${src}"
            alt="${p.nombre}"
            loading="lazy"
            onerror="this.onerror=null;this.src='${IMAGEN_GENERICA}';this.parentElement.classList.add('producto-card__imagen--generica')"
          >
          ${p.etiqueta ? `<span class="producto-card__etiqueta">${p.etiqueta}</span>` : ''}
        </div>
        <div class="producto-card__header">
          <h3 class="producto-card__nombre">${p.nombre}</h3>
          <div class="producto-card__precio">${p.precio}€ <small>/ ${p.unidad}</small></div>
        </div>
        <div class="producto-card__body">
          <p class="producto-card__desc">${p.descripcion}</p>
          <div class="producto-card__acciones">
            <div class="cantidad-control">
              <button type="button" aria-label="Menos" data-action="menos" data-id="${p.id}">−</button>
              <span id="qty-${p.id}">${qty}</span>
              <button type="button" aria-label="Más" data-action="mas" data-id="${p.id}">+</button>
            </div>
            <button class="btn-anadir" data-action="anadir" data-id="${p.id}">Añadir</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ── Carrito ──
function anadirAlCarrito(id, cantidad) {
  const producto = PRODUCTOS.find(p => p.id === id);
  if (!producto) return;

  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ id, cantidad });
  }
  actualizarBadge();
  mostrarToast(`✅ ${producto.nombre} añadido`);
}

function eliminarDelCarrito(id) {
  const idx = carrito.findIndex(item => item.id === id);
  if (idx !== -1) carrito.splice(idx, 1);
  actualizarBadge();
  renderModal();
}

function calcularTotal() {
  return carrito.reduce((sum, item) => {
    const p = PRODUCTOS.find(pr => pr.id === item.id);
    return sum + (p ? p.precio * item.cantidad : 0);
  }, 0);
}

function actualizarBadge() {
  const total = carrito.reduce((s, i) => s + i.cantidad, 0);
  const badge = document.getElementById('badgeCarrito');
  badge.textContent = total;
  badge.classList.toggle('btn-carrito__badge--hidden', total === 0);
}

// ── Modal ──
function abrirModal() {
  document.getElementById('modalCarrito').classList.add('modal-overlay--abierto');
  document.body.style.overflow = 'hidden';
  renderModal();
}

function cerrarModal() {
  document.getElementById('modalCarrito').classList.remove('modal-overlay--abierto');
  document.body.style.overflow = '';
}

function renderModal() {
  const body = document.getElementById('modalBody');

  if (carrito.length === 0) {
    body.innerHTML = `
      <div class="carrito-vacio">
        <span>🌰</span>
        <p>Tu carrito está vacío.<br>¡Añade algo rico!</p>
      </div>
    `;
    return;
  }

  const itemsHtml = carrito.map(item => {
    const p = PRODUCTOS.find(pr => pr.id === item.id);
    const subtotal = (p.precio * item.cantidad).toFixed(2);
    return `
      <div class="carrito-item">
        <div>
          <div class="carrito-item__nombre">${p.nombre}</div>
          <div class="carrito-item__detalle">${item.cantidad} ${p.unidad} × ${p.precio}€</div>
        </div>
        <div class="carrito-item__precio">${subtotal}€</div>
        <button class="carrito-item__eliminar" data-action="eliminar" data-id="${item.id}" aria-label="Eliminar">✕</button>
      </div>
    `;
  }).join('');

  const total = calcularTotal().toFixed(2);

  body.innerHTML = `
    ${itemsHtml}
    <div class="carrito-total">
      <span>Total orientativo</span>
      <span>${total}€</span>
    </div>
    <p class="nota-pedido">* Precio orientativo según peso. Te confirmamos el importe exacto.</p>

    <form class="form-pedido" id="formPedido">
      <div class="form-grupo">
        <label for="nombre">Tu nombre *</label>
        <input type="text" id="nombre" name="nombre" required placeholder="Ej: María García">
      </div>
      <div class="form-grupo">
        <label for="telefono">Teléfono *</label>
        <input type="tel" id="telefono" name="telefono" required placeholder="Ej: 600 00 00 00">
      </div>
      <div class="form-grupo">
        <label for="direccion">Dirección de envío</label>
        <textarea id="direccion" name="direccion" placeholder="Calle, ciudad, código postal..."></textarea>
      </div>
      <div class="form-grupo">
        <label for="notas">Notas (alergias, preferencias de corte…)</label>
        <textarea id="notas" name="notas" placeholder="Opcional"></textarea>
      </div>
      <div class="form-grupo">
        <label>Forma de pago *</label>
        <div class="pago-opciones">
          <div class="pago-opcion">
            <input type="radio" id="pago-bizum" name="pago" value="Bizum" required>
            <label for="pago-bizum">📱<br>Bizum</label>
          </div>
          <div class="pago-opcion">
            <input type="radio" id="pago-transferencia" name="pago" value="Transferencia">
            <label for="pago-transferencia">🏦<br>Transferencia</label>
          </div>
        </div>
      </div>
      <button type="submit" class="btn-pedido">📲 Enviar pedido por WhatsApp</button>
      <p class="nota-pedido">Se abrirá WhatsApp con tu pedido listo para enviar. Sin apps extra ni registro.</p>
    </form>
  `;

  document.getElementById('formPedido').addEventListener('submit', enviarPedido);
}

// ── Envío por WhatsApp ──
function enviarPedido(e) {
  e.preventDefault();
  const form = e.target;
  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const direccion = form.direccion.value.trim();
  const notas = form.notas.value.trim();
  const pago = form.querySelector('input[name="pago"]:checked')?.value;

  if (!nombre || !telefono || !pago) return;

  const lineas = carrito.map(item => {
    const p = PRODUCTOS.find(pr => pr.id === item.id);
    const sub = (p.precio * item.cantidad).toFixed(2);
    return `• ${p.nombre}: ${item.cantidad} ${p.unidad} (~${sub}€)`;
  });

  const total = calcularTotal().toFixed(2);

  let mensaje = `🥩 *PEDIDO IBÉRICOS JOSÉ*\n\n`;
  mensaje += `👤 *Nombre:* ${nombre}\n`;
  mensaje += `📞 *Teléfono:* ${telefono}\n`;
  if (direccion) mensaje += `📍 *Envío:* ${direccion}\n`;
  mensaje += `💳 *Pago:* ${pago}\n\n`;
  mensaje += `*Productos:*\n${lineas.join('\n')}\n\n`;
  mensaje += `💰 *Total orientativo:* ~${total}€\n`;
  if (notas) mensaje += `\n📝 *Notas:* ${notas}\n`;
  mensaje += `\n_Pedido desde la web · Valdelarco, Huelva_`;

  const url = `https://wa.me/34${NEGOCIO.telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  mostrarToast('📲 Abriendo WhatsApp…');
  cerrarModal();
}

// ── Toast ──
let toastTimer;
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('toast--visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('toast--visible'), 2800);
}

// ── Eventos ──
document.getElementById('productosGrid').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;

  if (action === 'mas' || action === 'menos') {
    const actual = cantidades[id] || 1;
    cantidades[id] = action === 'mas' ? actual + 1 : Math.max(1, actual - 1);
    document.getElementById(`qty-${id}`).textContent = cantidades[id];
  } else if (action === 'anadir') {
    anadirAlCarrito(id, cantidades[id] || 1);
  }
});

document.getElementById('btnAbrirCarrito').addEventListener('click', abrirModal);
document.getElementById('btnCerrarCarrito').addEventListener('click', cerrarModal);
document.getElementById('modalCarrito').addEventListener('click', e => {
  if (e.target === e.currentTarget) cerrarModal();
});

document.getElementById('modalBody').addEventListener('click', e => {
  const btn = e.target.closest('[data-action="eliminar"]');
  if (btn) eliminarDelCarrito(btn.dataset.id);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') cerrarModal();
});

// ── Init ──
renderProductos();
