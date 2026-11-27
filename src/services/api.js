// src/services/api.js
// Todo lo que habla con la API del Art Institute of Chicago vive aquí.
import { obras as obrasDePrueba } from "../data/datos-de-prueba.js";

const API = "https://api.artic.edu/api/v1";
const CAMPOS = "id,title,artist_display,classification_title,date_display,medium_display,image_id";

function construirUrlImagen(imageId, tamano = 843) {
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
 * @property {string} titulo
 * @property {string} autor
 * @property {string} tecnica
 * @property {string} periodo
 * @property {string} descripcionTecnica
 * @property {string} imagen
 * @property {string} imagenGrande
 */

export function adaptarObra(item) {
  const titulo = item.title?.trim() || "Título no disponible";
  const autor = item.artist_display?.trim() || "Autor desconocido";
  const tecnica = item.classification_title?.trim() || "Sin clasificar";
  const periodo = estimarSiglo(item);
  const descripcionTecnica = item.medium_display?.trim() || "Técnica no especificada";

  return {
    id: String(item.id),
    titulo,
    autor,
    tecnica,
    periodo,
    descripcionTecnica,
    imagen: construirUrlImagen(item.image_id, 600),
    imagenGrande: construirUrlImagen(item.image_id, 843),
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
    console.warn(`[api] No se pudo leer Art Institute of Chicago (${error.message}). Uso los datos de prueba.`);
    return obrasDePrueba;
  }
}
