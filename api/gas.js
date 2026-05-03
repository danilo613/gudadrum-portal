export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbwkRXPAvl4ZmjBzBRHHH5mhDUzEzsLqUpIOArlCBVtAyfiwgcvM8iN9pMhQUjK6xg3evA/exec";
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const url = query ? `${GAS}?${query}` : GAS;
  const res = await fetch(url);
  const text = await res.text();
  return new Response(text, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}
