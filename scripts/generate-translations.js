const fs = require('fs');
const path = require('path');

// Try to load .env.local or .env manually so we can get DEEPL_API_KEY without needing the 'dotenv' package
const envFiles = ['.env.local', '.env'];
for (const envFile of envFiles) {
  const envPath = path.join(__dirname, '..', envFile);
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) process.env[key] = value;
      }
    });
    break;
  }
}

// ==========================================
// 1. DEFINE YOUR SOURCE STRINGS HERE
// ==========================================
const sourceStrings = {
  sample_heading: "Ravi opened a small coffee shop on a quiet street. He didn’t just sell coffee — he sold comfort. Every morning, he remembered his customers’ names and their favorite drinks.",
  midsec_heading: "Design that speaks connects & converts",
  nav_home: "Home",
  nav_about: "About Us"
};

// ==========================================
// 2. DEFINE WHICH LANGUAGES TO SUPPORT
// ==========================================
// E.g. 'de' (German), 'it' (Italian), 'es' (Spanish), 'ta' (Tamil), 'fr' (French)
const targetLanguages = ['de', 'it', 'es', 'ta', 'fr'];

// DeepL supports these target languages (among others)
const deepLSupported = ['bg', 'cs', 'da', 'de', 'el', 'en-gb', 'en-us', 'es', 'et', 'fi', 'fr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'pl', 'pt-br', 'pt-pt', 'ro', 'ru', 'sk', 'sl', 'sv', 'tr', 'uk', 'zh'];

// Output file path
const outputFilePath = path.join(__dirname, '..', 'translations.json');

// Helper to check if DeepL Free or Pro API
const getDeepLUrl = () => {
  const key = process.env.DEEPL_API_KEY;
  if (!key) return null;
  return key.endsWith(':fx') 
    ? 'https://api-free.deepl.com/v2/translate' 
    : 'https://api.deepl.com/v2/translate';
};

async function fetchDeepLTranslation(text, targetLang) {
  const url = getDeepLUrl();
  const apiKey = process.env.DEEPL_API_KEY;
  if (!url || !apiKey) throw new Error("No DeepL API key found.");
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: [text],
      target_lang: targetLang.toUpperCase()
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`DeepL API Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.translations[0].text;
}

async function fetchGoogleTranslation(text, targetLang) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    return data[0].map(item => item[0]).join('');
  } catch (error) {
    console.error(`❌ Failed to translate to ${targetLang} via Google:`, error.message);
    return text; // Fallback to English on failure
  }
}

async function translateText(text, targetLang) {
  const useDeepL = process.env.DEEPL_API_KEY && deepLSupported.includes(targetLang.toLowerCase());
  
  if (useDeepL) {
    try {
      return await fetchDeepLTranslation(text, targetLang);
    } catch (e) {
      console.warn(`⚠️ DeepL failed for ${targetLang}, falling back to Google... (${e.message})`);
    }
  }
  
  // Fallback or default to Google Translate (e.g. for Tamil, since DeepL doesn't support it)
  return await fetchGoogleTranslation(text, targetLang);
}

async function generateTranslations() {
  console.log("🌍 Starting static translation generation...");
  
  if (process.env.DEEPL_API_KEY) {
    console.log("🔑 DeepL API Key detected. Using DeepL for supported European languages.");
  } else {
    console.log("⚠️ No DEEPL_API_KEY environment variable found.");
    console.log("   Using Google Translate for all languages.");
    console.log("   To use DeepL, add DEEPL_API_KEY=your_key to your .env or .env.local file.");
  }
  
  // Load existing translations to avoid re-translating if nothing changed
  let existingTranslations = {};
  if (fs.existsSync(outputFilePath)) {
    try {
       existingTranslations = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));
       console.log("📂 Found existing translations.json file.");
    } catch (e) {
       console.log("⚠️ Existing translations.json is invalid, starting fresh.");
    }
  }

  const finalDictionary = {
    en: sourceStrings, // English is just the raw source strings
  };

  for (const lang of targetLanguages) {
    console.log(`\n⏳ Translating to [${lang}]...`);
    finalDictionary[lang] = {};

    for (const [key, text] of Object.entries(sourceStrings)) {
      // Check if we ALREADY translated this exact string for this language previously
      if (existingTranslations[lang] && existingTranslations[lang][key] && existingTranslations.en && existingTranslations.en[key] === text) {
         // The english source hasn't changed, and we have a cached translation!
         finalDictionary[lang][key] = existingTranslations[lang][key];
         console.log(`  ⚡ [Cached] ${key}`);
      } else {
         // We need to fetch a fresh translation from the API
         const translated = await translateText(text, lang);
         finalDictionary[lang][key] = translated;
         console.log(`  ✅ [Fetched] ${key}`);
         
         // Add a small delay to avoid rate limits
         await new Promise(r => setTimeout(r, 300));
      }
    }
  }

  // Write the final dictionary to disk!
  fs.writeFileSync(outputFilePath, JSON.stringify(finalDictionary, null, 2));
  console.log(`\n🎉 Success! Translations saved permanently to:`);
  console.log(`   ${outputFilePath}`);
}

generateTranslations();
