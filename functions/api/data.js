// Data Fetch Karne ke liye
export async function onRequestGet(context) {
  const { env } = context;
  try {
    const data = await env.VIDEO_DB.get('site_data');
    const defaultData = { banners: [], quote: "Set a quote in admin panel", videos: [] };
    return new Response(data || JSON.stringify(defaultData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}

// Data Save/Update Karne ke liye
export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    await env.VIDEO_DB.put('site_data', JSON.stringify(body));
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to save data" }), { status: 500 });
  }
}
