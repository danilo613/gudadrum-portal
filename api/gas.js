export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbw-GZNu2iE9QIdJ2R18fSa8xIpdV13W8yLE4g6qi0P442YQ8kYm-rtzAcbZr-7Tt8XoeA/exec";
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const url = query ? `${GAS}?${query}` : GAS;
  const res = await fetch(url);
  const text = await res.text();
  return new Response(text, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}
