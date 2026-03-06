import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { targetLang } = await request.json();
    if (!targetLang) {
      return NextResponse.json({ error: "Missing targetLang" }, { status: 400 });
    }

    // Check if the language is already generated
    const checkPath = path.join(process.cwd(), `${targetLang}.json`);
    if (fs.existsSync(checkPath)) {
      return NextResponse.json({ error: `Language ${targetLang} is already generated. Please use Sync Translation instead.` }, { status: 400 });
    }

    // Read en.json for the full list of key-values
    const sourceFilePath = path.join(process.cwd(), 'en.json');
    if (!fs.existsSync(sourceFilePath)) {
      return NextResponse.json({ error: "Source file en.json not found" }, { status: 404 });
    }

    const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf8'));
    const finalDictionary = {};

    // Helper for retries on DNS ENOTFOUND or rate-limit glitches
    const fetchWithRetry = async (url, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(url);
          if (res.ok) return res;
          // If we hit a 429 Too Many Requests, definitely wait before retry
          if (res.status === 429) {
             await new Promise(r => setTimeout(r, 1000 * (i + 1)));
          }
        } catch (err) {
          if (i === retries - 1) throw err;
          // Wait longer on DNS failures before trying again
          await new Promise(r => setTimeout(r, 500 * (i + 1))); 
        }
      }
      throw new Error("Max retries reached");
    };

    // Translate each key-value pair
    const totalKeys = Object.keys(sourceData).length;
    let currentKey = 0;
    
    for (const [key, value] of Object.entries(sourceData)) {
      currentKey++;
      if (typeof value === 'string' && value.trim() !== '') {
        try {
          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(value)}`;
          const response = await fetchWithRetry(url);
          
          if (response && response.ok) {
            const data = await response.json();
            const translatedText = data[0].map(item => item[0]).join('');
            finalDictionary[key] = translatedText;
            console.log(`[${currentKey}/${totalKeys}] ✅ Translated ${targetLang}: ${key}`);
          } else {
            console.error(`[${currentKey}/${totalKeys}] ❌ Google API Error for ${key}`);
            finalDictionary[key] = value;
          }
        } catch (error) {
          console.error(`[${currentKey}/${totalKeys}] ❌ Error translating key ${key}:`, error);
          finalDictionary[key] = value;
        }
        
        // Anti-rate-limit delay (increased slightly again to avoid angering the DNS resolver)
        await new Promise(r => setTimeout(r, 150));
      } else {
        finalDictionary[key] = value;
        console.log(`[${currentKey}/${totalKeys}] ⏭️ Skipped non-string key: ${key}`);
      }
    }

    const publicOutputPath = path.join(process.cwd(), 'public', `${targetLang}.json`);
    const rootOutputPath = path.join(process.cwd(), `${targetLang}.json`);
    
    fs.writeFileSync(publicOutputPath, JSON.stringify(finalDictionary, null, 2));
    fs.writeFileSync(rootOutputPath, JSON.stringify(finalDictionary, null, 2));

    return NextResponse.json({ success: true, message: `Translations saved permanently to /${targetLang}.json and /public/${targetLang}.json` });
  } catch (error) {
    console.error('Translation Generation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
