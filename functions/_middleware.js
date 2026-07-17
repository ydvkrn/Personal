export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Is baar hum /login aur /login.html dono ko bypass kar rahe hain
  if (
    pathname.startsWith('/login') || 
    pathname.startsWith('/api/auth') || 
    pathname.startsWith('/_cloudflare/')
  ) {
    return context.next();
  }

  // Check Cookie for authentication
  const cookieHeader = request.headers.get('Cookie') || '';
  if (!cookieHeader.includes('site_access=granted')) {
    // Bina .html ke clean URL par redirect karo loop se bachne ke liye
    return Response.redirect(`${url.origin}/login`, 302);
  }

  return context.next();
}
