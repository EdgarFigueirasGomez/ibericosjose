/**
 * Catálogo de productos — edita aquí para añadir, quitar o modificar.
 *
 * Campos de cada producto:
 *   id, nombre, descripcion, precio, unidad
 *   imagen  → archivo en img/ (ej: "jamon-bellota.png"). Si se omite, usa vista-previa-nodisponible.
 *   destacado, etiqueta  → opcionales
 *
 * Para añadir foto: guarda la imagen en img/ y pon su nombre en el campo imagen.
 */
const IMAGEN_GENERICA = "img/vista-previa-nodisponible.png";

const PRODUCTOS = [
  {
    id: "jamon-bellota",
    nombre: "Jamón Ibérico de Bellota",
    descripcion: "Pieza entera de jamón ibérico 100% de bellota, criado en dehesa de Valdelarco. Curación mínima 36 meses. Sabor intenso y infiltración excepcional.",
    precio: 85,
    unidad: "kg",
    imagen: "jamon-bellota.png",
    destacado: true,
    etiqueta: "Estrella"
  },
  {
    id: "paletilla-bellota",
    nombre: "Paletilla Ibérica de Bellota",
    descripcion: "Paletilla ibérica 100% de bellota. Más pequeña que el jamón, ideal para consumo familiar. Curación 24 meses.",
    precio: 62,
    unidad: "kg",
    imagen: "paletilla-bellota.png",
    destacado: true
  },
  {
    id: "lomo-iberico",
    nombre: "Lomo Ibérico de Bellota",
    descripcion: "Lomo embuchado ibérico de bellota. Textura fundente, sabor suave y delicado. Pieza entera o en lonchas.",
    precio: 48,
    unidad: "kg"
  },
  {
    id: "presa-iberica",
    nombre: "Presa Ibérica de Bellota",
    descripcion: "Corte premium de la parte anterior del lomo. Jugosa, marmolada y perfecta para plancha o horno.",
    precio: 38,
    unidad: "kg",
    destacado: true
  },
  {
    id: "secreto-iberico",
    nombre: "Secreto Ibérico de Bellota",
    descripcion: "El corte más apreciado por los chefs. Máxima infiltración de grasa, sabor profundo. Ideal a la brasa.",
    precio: 42,
    unidad: "kg"
  },
  {
    id: "chorizo-iberico",
    nombre: "Chorizo Ibérico",
    descripcion: "Chorizo elaborado con carne ibérica de bellota y pimentón de la Vera. Curado artesanalmente.",
    precio: 22,
    unidad: "kg",
    imagen: "chorizo-iberico.png"
  },
  {
    id: "chorizo-blanco-iberico",
    nombre: "Chorizo Blanco Ibérico",
    descripcion: "Chorizo blanco (sin pimentón) de carne ibérica. Sabor suave y elegante, perfecto para aperitivo.",
    precio: 24,
    unidad: "kg"
  },
  {
    id: "salchichon-iberico",
    nombre: "Salchichón Ibérico",
    descripcion: "Salchichón de bellota con especias seleccionadas. Fino, aromático y de textura sedosa.",
    precio: 26,
    unidad: "kg",
    imagen: "salchichon-iberico.png"
  }
];

/** Resuelve la ruta de imagen de un producto (con fallback a vista-previa-nodisponible). */
function imagenProducto(producto) {
  if (!producto.imagen) return IMAGEN_GENERICA;
  if (producto.imagen.startsWith("img/")) return producto.imagen;
  return `img/${producto.imagen}`;
}

// Datos de contacto y negocio
const NEGOCIO = {
  nombre: "Ibéricos José",
  pueblo: "Valdelarco",
  provincia: "Huelva",
  telefono: "690253846",
  telefonoFormato: "690 25 38 46",
  email: "", // opcional — rellenar si usas Formspree/Web3Forms
  bizum: true,
  transferencia: true,
  cuentaBancaria: "" // rellenar cuando quieras mostrarla en el resumen
};
