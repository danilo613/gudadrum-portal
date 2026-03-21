
export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxv_el3FDOfKuMutYwZTd2NGY3uyLZzGgyYzeuF18iyhqi3P3azdEDzxPhjueFjuepXcQ/exec";
  const query = new URLSearchParams(req.query).toString();
  const url = query ? `${GAS_URL}?${query}` : GAS_URL;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
