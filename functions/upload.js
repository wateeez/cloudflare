// upload.js - handles file uploads
export async function onRequestPost({ request, env }) {
  const cookie = request.headers.get("Cookie");
  if (!cookie || !cookie.includes("admin=1")) {
    return new Response("Forbidden", { status: 403 });
  }

  const form = await request.formData();
  const file = form.get("image");
  const caption = form.get("caption");

  const filename = `${Date.now()}-${file.name}`;
  await env.IMAGES.put(filename, file.stream());

  await env.DB.prepare(
    "INSERT INTO works (image, caption) VALUES (?, ?)"
  ).bind(filename, caption).run();

  return Response.json({ success: true });
}
