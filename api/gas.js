export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbxtaT5EY4L-ujWzUz1Gx-o1zdakyKZ9TyOIVBelqADYi2mrUitHjI8VnnlEW6glGGQMjQ/exec";
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const url = query ? `${GAS}?${query}` : GAS;
  const res = await fetch(url);
  const text = await res.text();
  return new Response(text, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}
