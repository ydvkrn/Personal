export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // In files aur APIs ko bypass karo taaki login page open ho sake
  if (url.pathname === '/login.html' || url.pathname === '/api/auth' || url.pathname.startsWith('/_cloudflare/')) {
    return context.next();
  }

  // Check Cookie for authentication
  const cookieHeader = request.headers.get('Cookie') || '';
  if (!cookieHeader.includes('site_access=granted')) {
    // Agar cookie nahi hai, toh wapas login.html par bhej do
    return Response.redirect(`${url.origin}/login.html`, 302);
  }

  return context.next();
}
