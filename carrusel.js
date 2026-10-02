// Lógica del carrusel: genera las tarjetas desde contenido.js y gestiona la navegación
// (flechas, puntos, teclado y deslizamiento táctil). No hace falta editar este archivo
// para cambiar textos, imágenes o colores.
(() => {
  'use strict';

  const datos = window.CONTENIDO || [];
  const pista = document.getElementById('pista');
  const puntos = document.getElementById('puntos');
  const anuncio = document.getElementById('anuncio');
  const nav = document.querySelector('.carrusel__nav');
  const [anterior, siguiente] = document.querySelectorAll('.flecha');
  if (!datos.length || !pista) return;

  const escapar = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const iniciales = (marca) => marca.replace(/[^\p{L}\s]/gu, '').split(/\s+/).filter(Boolean)
    .slice(0, 2).map((p) => p[0]).join('').toUpperCase();
  const dosDigitos = (n) => String(n).padStart(2, '0');

  // ---- Tarjetas ----------------------------------------------------------------
  datos.forEach((d, i) => {
    const img = d.imagen || {};
    const contener = img.ajuste === 'contener' ? ' evidencia__marco--contener' : '';
    const fuente = d.fuente && d.fuente.url
      ? `Evidencia · <a href="${escapar(d.fuente.url)}" target="_blank" rel="noopener">${escapar(d.fuente.texto || d.fuente.url)}</a>`
      : d.fuente && d.fuente.texto ? `Evidencia · ${escapar(d.fuente.texto)}` : '';

    const diapositiva = document.createElement('div');
    diapositiva.className = 'diapositiva';
    diapositiva.setAttribute('role', 'group');
    diapositiva.setAttribute('aria-roledescription', 'diapositiva');
    diapositiva.setAttribute('aria-label', `${i + 1} de ${datos.length}: ${d.tipo}`);
    diapositiva.innerHTML = `
      <article class="tarjeta" style="--acento: ${escapar(d.color || '#37352f')}">
        <header class="tarjeta__cabecera revelar" style="--orden: 0">
          <div>
            <p class="etiqueta">Tipo de marketing</p>
            <p class="tipo"><span class="tipo__punto"></span>${escapar(d.tipo)}</p>
          </div>
          <span class="numero" aria-hidden="true">${dosDigitos(i + 1)}</span>
        </header>
        <div class="tarjeta__cuerpo">
          <div class="tarjeta__marca revelar" style="--orden: 1">
            <p class="etiqueta">Marca</p>
            <h2 class="marca">${escapar(d.marca)}</h2>
          </div>
          <figure class="evidencia revelar" style="--orden: 2">
            <div class="evidencia__marco${contener}">
              ${img.url ? `<img src="${escapar(img.url)}" alt="${escapar(img.alt || d.marca)}"${img.posicion ? ` style="object-position: ${escapar(img.posicion)}"` : ''} referrerpolicy="no-referrer" decoding="async">` : ''}
            </div>
            ${fuente ? `<figcaption>${fuente}</figcaption>` : ''}
          </figure>
          <div class="tarjeta__texto revelar" style="--orden: 3">
            <p class="definicion">${escapar(d.definicion)}</p>
            <p class="explicacion">${escapar(d.explicacion)}</p>
          </div>
        </div>
      </article>`;

    // Sin imagen (o si la URL falla): iniciales de la marca en lugar de un hueco vacío
    const marco = diapositiva.querySelector('.evidencia__marco');
    const monograma = () => {
      marco.innerHTML = `<span class="evidencia__monograma" aria-hidden="true">${escapar(iniciales(d.marca))}</span>`;
    };
    const foto = marco.querySelector('img');
    if (foto) foto.addEventListener('error', monograma, { once: true }); else monograma();

    pista.appendChild(diapositiva);

    const punto = document.createElement('button');
    punto.type = 'button';
    punto.className = 'punto';
    punto.setAttribute('aria-label', `Ir a ${i + 1}: ${d.tipo}`);
    punto.addEventListener('click', () => ir(i));
    puntos.appendChild(punto);
  });

  const diapositivas = [...pista.children];
  const botonesPunto = [...puntos.children];
  let actual = -1;

  // ---- Navegación ----------------------------------------------------------------
  function ir(i) {
    i = Math.max(0, Math.min(datos.length - 1, i));
    pista.style.transition = '';
    pista.style.transform = `translate3d(${-100 * i}%, 0, 0)`;
    if (i === actual) return;
    actual = i;

    diapositivas.forEach((el, k) => {
      const activa = k === i;
      el.classList.toggle('es-activa', activa);
      el.toggleAttribute('inert', !activa);
      el.setAttribute('aria-hidden', String(!activa));
    });
    botonesPunto.forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
    anterior.disabled = i === 0;
    siguiente.disabled = i === datos.length - 1;
    nav.style.setProperty('--acento-activo', datos[i].color || '#37352f');
    anuncio.textContent = `${datos[i].tipo}: ${datos[i].marca}`;
  }

  anterior.addEventListener('click', () => ir(actual - 1));
  siguiente.addEventListener('click', () => ir(actual + 1));
  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowLeft') ir(actual - 1);
    if (e.key === 'ArrowRight') ir(actual + 1);
  });

  // ---- Deslizamiento táctil: la tarjeta sigue al dedo ------------------------------
  const ventana = pista.parentElement;
  let toque = null;

  ventana.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    toque = { x: e.clientX, y: e.clientY, t: performance.now(), arrastrando: false, id: e.pointerId };
  });
  ventana.addEventListener('pointermove', (e) => {
    if (!toque || e.pointerId !== toque.id) return;
    const dx = e.clientX - toque.x, dy = e.clientY - toque.y;
    if (!toque.arrastrando) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { toque = null; return; } // scroll vertical
      if (Math.abs(dx) < 8) return;
      toque.arrastrando = true;
      ventana.setPointerCapture(e.pointerId);
      pista.style.transition = 'none';
    }
    const enBorde = (actual === 0 && dx > 0) || (actual === datos.length - 1 && dx < 0);
    const desplazamiento = enBorde ? dx * 0.3 : dx;
    pista.style.transform = `translate3d(calc(${-100 * actual}% + ${desplazamiento}px), 0, 0)`;
  });
  const soltar = (e) => {
    if (!toque || e.pointerId !== toque.id) return;
    if (toque.arrastrando && e.type === 'pointercancel') ir(actual);
    else if (toque.arrastrando) {
      const dx = e.clientX - toque.x;
      const rapido = Math.abs(dx) / (performance.now() - toque.t) > 0.45;
      const umbral = Math.abs(dx) > ventana.clientWidth * 0.18 || (rapido && Math.abs(dx) > 30);
      ir(umbral ? actual - Math.sign(dx) : actual);
    }
    toque = null;
  };
  ventana.addEventListener('pointerup', soltar);
  ventana.addEventListener('pointercancel', soltar);

  ir(0);
})();
