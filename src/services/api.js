// src/services/api.js
// Todo lo que habla con la API del Art Institute of Chicago vive aquí.
import { obras as obrasDePrueba } from "../data/datos-de-prueba.js";

const API = "https://api.artic.edu/api/v1";
const CAMPOS =
  "id,title,artist_display,classification_title,date_display,medium_display,image_id";

function construirUrlImagen(imageId, tamano = 600) {
  if (!imageId) return "img/portada.svg";
  return `https://www.artic.edu/iiif/2/${imageId}/full/${tamano},/0/default.jpg`;
}
function estimarSiglo(obraApi) {
  if (obraApi.date_display) return obraApi.date_display;
  return "Período no especificado (aprox.)";
}

/**
 * @typedef {Object} Obra
 * @property {string} id
 * @property {string} nombre
 * @property {string} artista
 * @property {string} fecha
 * @property {string} categoria
 * @property {string} tecnica
 * @property {string} imagen
 */

export function adaptarObra(item) {
  const tieneImagen = Boolean(item.image_id);

  return {
    id: String(item.id),
    nombre: item.title?.trim() || "Obra sin título",
    artista: item.artist_display?.trim() || "Autor desconocido",
    fecha: item.date_display?.trim() || "Fecha no registrada",
    categoria: item.classification_title?.trim() || "Obra",
    tecnica: item.medium_display?.trim() || "",
    imagen: tieneImagen ? `api/imagen/${item.image_id}` : "img/portada.svg",
  };
}

/**
 * @returns {Promise<Obra[]>}
 */
export async function obtenerObras(limite = 12) {
  try {
    const url = `${API}/artworks?fields=${CAMPOS}&limit=${limite}`;
    const respuesta = await fetch(url, {
      signal: AbortSignal.timeout(8000),
    });

    if (!respuesta.ok) {
      throw new Error(`La API respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    if (!Array.isArray(datos.data) || datos.data.length === 0) {
      throw new Error("La API no devolvió obras");
    }

    return datos.data.map(adaptarObra);
  } catch (error) {
    console.warn(
      `[api] No se pudo leer Art Institute of Chicago (${error.message}). Uso los datos de prueba.`,
    );
    return obrasDePrueba;
  }
}
export async function obtenerRecomendadas(cantidad = 3) {
  const obras = await obtenerObras(12);
  const conImagen = obras.filter((o) => o.imagen.startsWith("api/"));
  return (conImagen.length ? conImagen : obras).slice(0, cantidad);
}
