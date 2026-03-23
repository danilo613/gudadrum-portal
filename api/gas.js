export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbwtZqZ90w8Q6V5IbFv-modJC3eYCdkKuJ4BKuE9jkr8Jfg5CRVq53f2F8azo_W7K0xYpQ/exec";
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const url = query ? `${GAS}?${query}` : GAS;
  const res = await fetch(url);
  const text = await res.text();
  return new Response(text, {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
