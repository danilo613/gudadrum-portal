export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxv_el3FDOfKuMutYwZTd2NGY3uyLZzGgyYzeuF18iyhqi3P3azdEDzxPhjueFjuepXcQ/exec";
  const query = new URLSearchParams(req.query).toString();
  const url = query ? `${GAS_URL}?${query}` : GAS_URL;
  
  try {
    // GASは302リダイレクトを返すので手動でフォロー
    const response = await fetch(url, { redirect: "manual" });
    const location = response.headers.get("location");
    
    const finalUrl = location || url;
    const finalResponse = await fetch(finalUrl);
    const text = await finalResponse.text();
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.send(text);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
