export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    // Cloudflare Dashboard me ACCESS_PASSCODE variable banana zaroori hai. 
    // Agar nahi banaya toh default '12345678' manega.
    const CORRECT_PASSCODE = env.ACCESS_PASSCODE || '12345678'; 

    if (body.passcode === CORRECT_PASSCODE) {
      const response = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      // 30 din (2592000 sec) ke liye secure cookie set
      response.headers.append('Set-Cookie', `site_access=granted; Path=/; Max-Age=2592000; HttpOnly; SameSite=Strict`);
      return response;
    } else {
      return new Response(JSON.stringify({ error: 'Galat Passcode!' }), { status: 401 });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Request Failed' }), { status: 400 });
  }
}
