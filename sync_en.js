const fs = require('fs');

async function syncEn() {
  const de = JSON.parse(fs.readFileSync('de.json', 'utf8'));
  const en = JSON.parse(fs.readFileSync('en.json', 'utf8'));
  
  const fetchWithRetry = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (res.ok) return res;
        if (res.status === 429) {
           await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(r => setTimeout(r, 500 * (i + 1))); 
      }
    }
    throw new Error("Max retries reached");
  };

  let added = 0;
  let totalMissing = 0;
  for (const key of Object.keys(de)) {
    if (en[key] === undefined) {
      totalMissing++;
    }
  }
  
  console.log(`Found ${totalMissing} missing keys in en.json. Translating from German back to English...`);
  
  let currentKey = 0;
  for (const [key, value] of Object.keys(de).map(k => [k, de[k]])) {
    if (en[key] === undefined) {
      currentKey++;
      if (typeof value === 'string' && value.trim() !== '') {
        try {
          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=en&dt=t&q=${encodeURIComponent(value)}`;
          const response = await fetchWithRetry(url);
          if (response && response.ok) {
             const data = await response.json();
             const translatedText = data[0].map(item => item[0]).join('');
             en[key] = translatedText;
             console.log(`[${currentKey}/${totalMissing}] ✅ Translated missing en key: ${key}`);
          } else {
             en[key] = value;
             console.error(`[${currentKey}/${totalMissing}] ❌ Failed to translate ${key}, using German text`);
          }
        } catch (e) {
          en[key] = value;
          console.error(`[${currentKey}/${totalMissing}] ❌ Error trans ${key}: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 150));
      } else {
        en[key] = value;
      }
      added++;
    }
  }
  
  fs.writeFileSync('en.json', JSON.stringify(en, null, 2));
  fs.writeFileSync('public/en.json', JSON.stringify(en, null, 2)); // also update public
  console.log(`\nSuccessfully added ${added} missing keys to en.json`);
}

syncEn().catch(console.error);
