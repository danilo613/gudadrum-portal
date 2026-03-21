export const config = { runtime: "edge" };

export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbxc5jypY5N-Z2Zsj2qtWQKVaRg76GJfzLa1UX1dPlRZfNKJhJFh1vbglT_iw1QLs49OJA/exec";
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const url = query ? `${GAS}?${query}` : GAS;

  const res = await fetch(url);
  const text = await res.text();

  return new Response(text, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
