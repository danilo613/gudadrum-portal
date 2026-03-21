const https = require("https");
const http = require("http");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxv_el3FDOfKuMutYwZTd2NGY3uyLZzGgyYzeuF18iyhqi3P3azdEDzxPhjueFjuepXcQ/exec";
  const query = new URLSearchParams(req.query).toString();
  const url = query ? `${GAS_URL}?${query}` : GAS_URL;
  
  try {
    const text = await fetchUrl(url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.send(text);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
