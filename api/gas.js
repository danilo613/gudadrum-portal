export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxv_el3FDOfKuMutYwZTd2NGY3uyLZzGgyYzeuF18iyhqi3P3azdEDzxPhjueFjuepXcQ/exec";
  const query = new URLSearchParams(req.query).toString();
  const url = query ? `${GAS_URL}?${query}` : GAS_URL;
  
  try {
    const response = await fetch(url, { redirect: "manual" });
    const location = response.headers.get("location");
    const status = response.status;
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ 
      status, 
      location, 
      url,
      headers: Object.fromEntries(response.headers.entries())
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
```

これでリダイレクト先のURLが確認できます。更新してこのURLを開いてください：
```
https://gudadrum-portal.vercel.app/api/gas?action=notion
