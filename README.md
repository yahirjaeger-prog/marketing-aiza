# Carrusel: tipos de marketing

Componente para insertar en Notion con un bloque **Embed**. Muestra tres ejemplos de segmentación en un carrusel horizontal:

1. **Marketing diferenciado**: R.E.M. Beauty
2. **Marketing concentrado**: The Ordinary
3. **Marketing indiferenciado**: Pizzas Capricciosas

Se navega con las flechas, los puntos, las teclas ← → o deslizando el dedo en el celular.

## Archivos

| Archivo | Qué contiene |
| --- | --- |
| `contenido.js` | **Lo que se edita**: marcas, tipos, textos, imágenes, fuentes y color de cada tarjeta. |
| `estilos.css` | Diseño. Los colores y tipografías generales están al inicio, en `:root`. |
| `carrusel.js` | Lógica de navegación. No hace falta tocarlo para cambiar contenido. |
| `index.html` | Estructura mínima de la página. |
| `img/` | Imágenes de evidencia locales. |

## Cambiar una imagen

En `contenido.js`, cada tarjeta tiene un bloque `imagen` con estos campos:

- `url`: dirección de la imagen. Puede ser un enlace externo (`https://...`) o un archivo dentro de esta carpeta (por ejemplo `img/capricciosas.jpg`).
- `alt`: descripción breve de la imagen.
- `ajuste`: `'cubrir'` para fotografías y `'contener'` para un producto sobre fondo liso.

Si la `url` está vacía o la imagen no carga, la tarjeta muestra las iniciales de la marca en lugar de un hueco.

Las imágenes de R.E.M. Beauty y Pizzas Capricciosas están en la carpeta `img/`. La de The Ordinary se carga desde su sitio oficial; si esa página cambia sus archivos, descarga la imagen, guárdala en `img/` y cambia la `url` por la ruta local.

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio de GitHub.
2. En el repositorio, entra en **Settings → Pages**. En **Source** elige *Deploy from a branch*, luego la rama `main` y la carpeta `/ (root)`.
3. Tras un minuto la página estará disponible en `https://<usuario>.github.io/<repositorio>/`.
4. En Notion, escribe `/embed` y pega esa URL. Una altura de bloque de unos **560 px** muestra la tarjeta completa en computadora.

En celular la tarjeta es más alta. Si no cabe completa, el texto se desplaza dentro del Embed y las flechas permanecen visibles abajo.
