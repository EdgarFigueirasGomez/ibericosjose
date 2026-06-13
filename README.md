# Ibéricos José

Web de venta de productos ibéricos de bellota de **Valdelarco, Huelva**.

Sitio estático (HTML, CSS y JavaScript) pensado para publicarse en **GitHub Pages**, sin backend ni pasarela de pago. Los pedidos se envían por **WhatsApp** y el pago se acuerda por **Bizum** o **transferencia**.

**Producción:** https://edgarfigueirasgomez.github.io/ibericosjose/

## Estructura del proyecto

```
ibericosjose/
├── index.html              # Página principal
├── css/styles.css          # Estilos (burdeos, dorado, negro)
├── js/
│   ├── products.js         # Catálogo y datos de contacto ← edita aquí
│   └── app.js              # Carrito y envío por WhatsApp
├── img/
│   ├── iberijose.png       # Logo
│   ├── vista-previa-nodisponible.png
│   └── *.png               # Fotos de productos
└── .github/workflows/      # Despliegue automático en GitHub Pages
```

## Ver en local

Desde la raíz del proyecto:

```bash
python3 -m http.server 8080
```

Abre http://localhost:8080

## Editar productos

Abre `js/products.js` y modifica el array `PRODUCTOS`:

```javascript
{
  id: "jamon-bellota",
  nombre: "Jamón Ibérico de Bellota",
  descripcion: "Texto del producto...",
  precio: 85,
  unidad: "kg",
  imagen: "jamon-bellota.png",  // opcional
  destacado: true,              // opcional — borde dorado
  etiqueta: "Estrella"          // opcional — badge en la tarjeta
}
```

- **Añadir producto:** copia un bloque y cambia los campos.
- **Quitar producto:** borra su bloque del array.
- **Sin foto:** omite el campo `imagen`; se usará `vista-previa-nodisponible.png`.

### Añadir imagen de producto

1. Guarda la imagen en `img/` (por ejemplo `lomo-iberico.png`).
2. Añade en el producto: `imagen: "lomo-iberico.png"`.

Las imágenes se muestran en círculo con marco dorado/burdeos.

## Datos de contacto

En `js/products.js`, objeto `NEGOCIO`:

```javascript
const NEGOCIO = {
  nombre: "Ibéricos José",
  pueblo: "Valdelarco",
  provincia: "Huelva",
  telefono: "690253846",
  telefonoFormato: "690 25 38 46",
  // ...
};
```

## Cómo funcionan los pedidos

1. El cliente añade productos al carrito.
2. Rellena nombre, teléfono, dirección y forma de pago.
3. Pulsa **Enviar pedido por WhatsApp**.
4. Se abre WhatsApp con el mensaje preparado al **690 25 38 46**.
5. Se confirma peso, importe y datos de Bizum/transferencia por teléfono.

No hay base de datos: los pedidos llegan por WhatsApp.

## Publicar cambios

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

GitHub Actions despliega automáticamente en GitHub Pages al hacer push a `main`.

## Tecnologías

- HTML5, CSS3, JavaScript (vanilla)
- Google Fonts: Playfair Display + Nunito
- GitHub Pages + GitHub Actions

## Contacto

**Ibéricos José** · Valdelarco, Huelva  
📞 690 25 38 46
