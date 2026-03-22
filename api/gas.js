export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbyxylgMmIFylS3hzkwZWlFnZzi0lskEsq7j2cwdePaThHWLNPC6GqxlJZ7zT-g0Jbn5lg/exec";
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const url = query ? `${GAS}?${query}` : GAS;
  const res = await fetch(url);
  const text = await res.text();
  return new Response(text, {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbyxylgMmIFylS3hzkwZWlFnZzi0lskEsq7j2cwdePaThHWLNPC6GqxlJZ7zT-g0Jbn5lg/exec";
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const url = query ? `${GAS}?${query}` : GAS;
  const res = await fetch(url);
  const text = await res.text();
  return new Response(text, {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
