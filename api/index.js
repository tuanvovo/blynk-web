export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pin = url.searchParams.get("pin");
  const action = url.searchParams.get("action"); // get hoặc update
  const value = url.searchParams.get("value");

  const token = context.env.BLYNK_TOKEN; // Lấy từ GitHub Secret
  const apiUrl = `https://blynk.cloud/external/api/${action}?token=${token}&${pin}${value ? '=' + value : ''}`;

  const res = await fetch(apiUrl);
  const text = await res.text();

  return new Response(text, {
    headers: { "content-type": "text/plain" },
  });
}
