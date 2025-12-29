// login.js - handles authentication
export async function onRequestPost({ request, env }) {
  const { password } = await request.json();

  if (password !== env.ADMIN_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response("OK", {
    headers: {
      "Set-Cookie": "admin=1; HttpOnly; Secure; Path=/"
    }
  });
}
