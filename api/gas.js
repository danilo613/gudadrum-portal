export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbzQwptiq5auDovIBQjqPOWm7xQg3ga3IFstCVt1V3VIRhr4EuEjR5wvGxst-Xq4PESiiwexec";
  
  let url = GAS;
  
  if (req.method === "POST") {
    const body = await req.json();
    const query = new URLSearchParams(body).toString();
    url = `${GAS}?${query}`;
  } else {
    const { searchParams } = new URL(req.url);
    const query = searchParams.toString();
    url = query ? `${GAS}?${query}` : GAS;
  }
  
  const res = await fetch(url);
  const text = await res.text();
  return new Response(text, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
