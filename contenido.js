// ============================================================================
//  CONTENIDO DEL CARRUSEL: edita aquí marcas, textos, imágenes y colores.
//  Cada bloque { ... } es una tarjeta. El orden de la lista es el orden en pantalla.
//
//  tipo         → nombre del tipo de marketing
//  marca        → nombre de la marca
//  definicion   → qué es ese tipo de marketing (una línea)
//  explicacion  → por qué la marca es un ejemplo (2–3 frases)
//  color        → color de acento de la tarjeta (punto, número y detalles)
//  imagen.url   → URL de la imagen de evidencia. Puede ser externa o un archivo
//                 de esta carpeta (p. ej. 'img/capricciosas.jpg').
//                 Si se deja vacía o no carga, se muestran las iniciales de la marca.
//  imagen.alt   → descripción de la imagen (accesibilidad)
//  imagen.ajuste→ 'cubrir' (foto a sangre) o 'contener' (producto con fondo)
//  imagen.posicion → qué parte de la foto se conserva al recortarla
//                 ('50% 50%' = centro, '0% 50%' = lado izquierdo, '50% 100%' = abajo)
//  fuente       → de dónde viene la imagen; aparece como pie de foto
// ============================================================================

window.CONTENIDO = [
  {
    tipo: 'Marketing diferenciado',
    marca: 'R.E.M. Beauty',
    definicion: 'La empresa atiende varios segmentos y diseña una oferta distinta para cada uno.',
    explicacion:
      'La marca de maquillaje de Ariana Grande organiza su catálogo en líneas para ojos, labios y rostro, ' +
      'con tonos para distintos tipos de piel y colecciones especiales como «Wicked: For Good». ' +
      'Cada línea se dirige a un público distinto con una propuesta propia.',
    color: '#8a74b8',
    imagen: {
      url: 'img/rem-beauty.jpg',
      alt: 'Ariana Grande con la paleta de sombras de la colaboración r.e.m. beauty × Wicked',
      ajuste: 'cubrir',
      posicion: '65% 90%', // conserva el rostro y la paleta
    },
    fuente: { texto: 'Campaña r.e.m. beauty × Wicked' },
  },
  {
    tipo: 'Marketing concentrado',
    marca: 'The Ordinary',
    definicion: 'La empresa se enfoca en un solo segmento del mercado y adapta toda su oferta a él.',
    explicacion:
      'The Ordinary, de DECIEM, se dirige a un nicho: personas que eligen su cuidado de la piel por ingredientes ' +
      'y buscan fórmulas sencillas a precio accesible. Cada producto lleva el nombre de su activo y su concentración, ' +
      'como «Niacinamide 10% + Zinc 1%», bajo el lema «Clinical Formulations with Integrity».',
    color: '#5f6b73',
    imagen: {
      url: 'https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dwce8a7cdf/Images/products/The%20Ordinary/rdn-niacinamide-10pct-zinc-1pct-30ml.png?sw=900',
      alt: 'Sérum Niacinamide 10% + Zinc 1% de The Ordinary',
      ajuste: 'contener',
    },
    fuente: { texto: 'theordinary.com', url: 'https://theordinary.com' },
  },
  {
    tipo: 'Marketing indiferenciado',
    marca: 'Pizzas Capricciosas',
    definicion: 'La empresa no distingue entre segmentos: ofrece una misma propuesta a todo el mercado.',
    explicacion:
      'La pizza es un producto de consumo masivo, con una demanda amplia y parecida entre públicos. ' +
      'Pizzas Capricciosas presenta un mismo menú con un solo mensaje, «Pizzas Gourmet, hechas con manos locales», ' +
      'para familias, estudiantes o grupos de amigos, y busca llegar al mayor número de personas con una sola propuesta.',
    color: '#c0563f',
    imagen: {
      url: 'img/pizzas-capricciosas.jpg',
      alt: 'Publicidad de Pizzas Capricciosas: «Pizzas Gourmet, hechas con manos locales»',
      ajuste: 'cubrir',
      posicion: '0% 50%', // conserva el logotipo, a la izquierda
    },
    fuente: { texto: 'Publicidad de Pizzas Capricciosas' },
  },
];
