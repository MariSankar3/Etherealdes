import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { targetLang, dryRun = false } = await request.json();
    if (!targetLang) {
      return NextResponse.json({ error: "Missing targetLang" }, { status: 400 });
    }

    // 1. Load current en.json
    const sourceFilePath = path.join(process.cwd(), 'en.json');
    if (!fs.existsSync(sourceFilePath)) {
      return NextResponse.json({ error: "Source file en.json not found" }, { status: 404 });
    }
    const currentEnData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf8'));

    // 2. Load or initialize Sync State Memory (.sync_state.json)
    const syncStatePath = path.join(process.cwd(), '.sync_state.json');
    let syncState = {};
    if (fs.existsSync(syncStatePath)) {
      syncState = JSON.parse(fs.readFileSync(syncStatePath, 'utf8'));
    }
    
    // Ensure __genesis exists. The genesis state preserves the oldest known en.json tracking state 
    // from the very first synchronized language, ensuring all other non-tracked languages share the same historic baseline.
    if (!syncState.__genesis && Object.keys(syncState).length > 0) {
      const firstLang = Object.keys(syncState).find(k => k !== '__genesis');
      if (firstLang) {
        syncState.__genesis = { ...syncState[firstLang] };
      }
    }

    // First time initialization for a specific targetLang
    if (!syncState[targetLang]) {
      let baselineEn = null;
      if (syncState.__genesis) {
        // Inherit the global oldest historical baseline to detect recent changes!
        baselineEn = { ...syncState.__genesis };
      } else {
        // If there's no history at all, fallback to current en.json and make it the genesis
        baselineEn = { ...currentEnData };
        syncState.__genesis = { ...baselineEn };
      }
      syncState[targetLang] = baselineEn;
    }

    // 3. Load target language file
    const rootOutputPath = path.join(process.cwd(), `${targetLang}.json`);
    const publicOutputPath = path.join(process.cwd(), 'public', `${targetLang}.json`);
    let targetData = {};
    if (fs.existsSync(rootOutputPath)) {
      targetData = JSON.parse(fs.readFileSync(rootOutputPath, 'utf8'));
    }

    // 4. Identify keys to translate (completely missing OR the English string was modified)
    const keysToTranslate = [];
    for (const [key, currentEnValue] of Object.entries(currentEnData)) {
      if (typeof currentEnValue !== 'string' || currentEnValue.trim() === '') continue;

      const isMissing = !targetData[key] || targetData[key].trim() === '';
      const previousEnValue = syncState[targetLang][key];
      const englishChanged = previousEnValue !== undefined && previousEnValue !== currentEnValue;

      if (isMissing || englishChanged) {
        keysToTranslate.push(key);
      }
    }

    // 5. If dryRun mode, just return the detected keys!
    if (dryRun) {
      return NextResponse.json({ success: true, keysToTranslate });
    }

    // 6. Begin translation process
    const finalDictionary = { ...targetData };
    const translatedKeys = [];
    let currentKeyIdx = 0;
    const totalTranslateCount = keysToTranslate.length;

    if (totalTranslateCount === 0) {
      // Nothing to do, just make sure state is saved
      fs.writeFileSync(syncStatePath, JSON.stringify(syncState, null, 2));
      return NextResponse.json({ 
        success: true, 
        message: `Translations synced successfully to /${targetLang}.json and /public/${targetLang}.json`,
        translatedKeys: [] 
      });
    }

    // Helper for retries on DNS ENOTFOUND or rate-limit glitches
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

    for (const [key, value] of Object.entries(currentEnData)) {
      if (keysToTranslate.includes(key)) {
        currentKeyIdx++;
        try {
          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(value)}`;
          const response = await fetchWithRetry(url);
          
          if (response && response.ok) {
            const data = await response.json();
            const translatedText = data[0].map(item => item[0]).join('');
            finalDictionary[key] = translatedText;
            syncState[targetLang][key] = value; // Update the memory cache with the new English string!
            translatedKeys.push(key);
            console.log(`[${currentKeyIdx}/${totalTranslateCount}] ✅ Synced ${targetLang}: ${key}`);
          } else {
            console.error(`[${currentKeyIdx}/${totalTranslateCount}] ❌ Google API Error for ${key}`);
            if (finalDictionary[key] === undefined) finalDictionary[key] = value;
          }
        } catch (error) {
          console.error(`[${currentKeyIdx}/${totalTranslateCount}] ❌ Error translating key ${key}:`, error);
          if (finalDictionary[key] === undefined) finalDictionary[key] = value;
        }
        
        // Anti-rate-limit delay
        await new Promise(r => setTimeout(r, 150));
      } else {
        // Keep existing value
        if (finalDictionary[key] === undefined) {
          finalDictionary[key] = value;
        }
        // Ensure memory is populated for existing unchanged strings
        if (syncState[targetLang][key] === undefined) {
           syncState[targetLang][key] = value;
        }
      }
    }

    // 7. Save to disk
    fs.writeFileSync(publicOutputPath, JSON.stringify(finalDictionary, null, 2));
    fs.writeFileSync(rootOutputPath, JSON.stringify(finalDictionary, null, 2));
    fs.writeFileSync(syncStatePath, JSON.stringify(syncState, null, 2)); // Save tracking registry!

    return NextResponse.json({ 
      success: true, 
      message: `Translations synced successfully to /${targetLang}.json and /public/${targetLang}.json`,
      translatedKeys 
    });
  } catch (error) {
    console.error('Translation Sync Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
