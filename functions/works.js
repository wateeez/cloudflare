// works.js - handles portfolio works
export async function onRequest({ env }) {
  const works = await env.DB.prepare(
    "SELECT * FROM works ORDER BY created_at DESC"
  ).all();

  return Response.json(works.results);
}
