export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbzTIUmO3PA0pTZcheAZP1Po3pWdwL-J8j87YwHmB7JRo34V5Zev2ilVTH50AKUD2xn2/exec";
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const url = query ? `${GAS}?${query}` : GAS;
  const res = await fetch(url);
  const text = await res.text();
  return new Response(text, {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
