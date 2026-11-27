// src/data/datos-de-prueba.js
// Seis obras de prueba con la misma estructura que devolverá el adaptador
// de la API del Art Institute of Chicago para Arte Abierto.

export const obras = [
  {
    id: "27992",
    nombre: "Tarde de domingo en la isla de La Grande Jatte",
    categoria: "Pintura",
    area: "Francia · 1884–1886",
    imagen: "img/portada.svg",
    minutos: 10,
    dificultad: "Clásico",
  },
  {
    id: "28560",
    nombre: "La habitación",
    categoria: "Pintura",
    area: "Países Bajos · 1889",
    imagen: "img/portada.svg",
    minutos: 10,
    dificultad: "Posimpresionismo",
  },
  {
    id: "80607",
    nombre: "La gran ola de Kanagawa",
    categoria: "Grabado",
    area: "Japón · aprox. 1831",
    imagen: "img/portada.svg",
    minutos: 5,
    dificultad: "Ukiyo-e",
  },
  {
    id: "111628",
    nombre: "American Gothic",
    categoria: "Pintura",
    area: "Estados Unidos · 1930",
    imagen: "img/portada.svg",
    minutos: 10,
    dificultad: "Regionalismo",
  },
  {
    id: "16568",
    nombre: "Pila de heno (atardecer)",
    categoria: "Pintura",
    area: "Francia · 1890–1891",
    imagen: "img/portada.svg",
    minutos: 10,
    dificultad: "Impresionismo",
  },
  {
    id: "6565",
    nombre: "Autorretrato",
    categoria: "Dibujo",
    area: "Francia · aprox. 1887",
    imagen: "img/portada.svg",
    minutos: 5,
    dificultad: "Posimpresionismo",
  },
];

// Listas calculadas desde los datos reales o de prueba sin duplicados
export const categorias = [...new Set(obras.map((o) => o.categoria))];
export const dificultades = [...new Set(obras.map((o) => o.dificultad))];
