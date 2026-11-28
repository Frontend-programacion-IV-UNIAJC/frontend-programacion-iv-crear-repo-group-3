export const prerender = false;

export async function GET({ params }) {
  const url = `https://www.artic.edu/iiif/2/${params.id}/full/843,/0/default.jpg`;

  const respuesta = await fetch(url, {
    headers: {
      Referer: "https://www.artic.edu/",
      "User-Agent": "ArteAbierto (proyecto academico)",
    },
  });

  if (!respuesta.ok) {
    return new Response(null, { status: respuesta.status });
  }

  return new Response(respuesta.body, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
