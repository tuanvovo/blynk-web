export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);

    // Lấy tham số từ URL
    const pin = url.searchParams.get("pin");      // VD: V1
    const action = url.searchParams.get("action"); // get hoặc update
    const value = url.searchParams.get("value");   // giá trị (nếu có)

    // Lấy token từ biến môi trường (GitHub Secret)
    const token = context.env.BLYNK_TOKEN;
    if (!token) {
      return new Response("❌ Thiếu BLYNK_TOKEN trong cấu hình!", { status: 500 });
    }

    // Tạo URL gọi tới Blynk API
    const apiUrl = `https://blynk.cloud/external/api/${action}?token=${token}&${pin}${value ? "=" + value : ""}`;

    // Gửi request đến Blynk Cloud
    const res = await fetch(apiUrl);
    const text = await res.text();

    // Trả kết quả về trình duyệt
    return new Response(text, {
      headers: { "content-type": "text/plain; charset=utf-8" },
      status: res.ok ? 200 : res.status
    });

  } catch (err) {
    return new Response("⚠️ Lỗi xử lý yêu cầu: " + err.message, { status: 500 });
  }
}
