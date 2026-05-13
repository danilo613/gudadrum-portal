export const config = { runtime: "edge" };
export default async function handler(req) {
  const GAS = "https://script.google.com/macros/s/AKfycbxd_XHX5qnOf-pS7xBztHHbYll6bgwZ7J-Hno6AbJOjlR8C1WD5k4s_D7xszBOir6HF0w/exec";
  
  let url = GAS;
  let gasRes;
  
  if (req.method === "POST") {
    const body = await req.json();
    const query = new URLSearchParams(body).toString();
    url = `${GAS}?${query}`;
  } else {
    const { searchParams } = new URL(req.url);
    const query = searchParams.toString();
    url = query ? `${GAS}?${query}` : GAS;
  }
  
  gasRes = await fetch(url);
  const text = await gasRes.text();
  return new Response(text, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
