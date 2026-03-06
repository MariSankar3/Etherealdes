import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'; // Prevent static generation errors when reading filesystem at runtime

export async function GET() {
  try {
    const generatedSet = new Set();
    
    // 1. Check physical files in the root directory
    const files = fs.readdirSync(process.cwd());
    files.forEach(file => {
      // Very basic regex to check for language codes like 'es.json', 'ko.json', etc.
      // E.g. 2 to 5 character codes before .json
      if (file.endsWith('.json') && file !== "package.json" && file !== "package-lock.json" && file !== ".sync_state.json" && file !== "en.json" && file !== "translations.json") {
         const code = file.replace('.json', '');
         if (code.length >= 2 && code.length <= 5) {
            generatedSet.add(code);
         }
      }
    });

    // 2. Also check the sync_state registry just to be safe
    const syncStatePath = path.join(process.cwd(), '.sync_state.json');
    if (fs.existsSync(syncStatePath)) {
      const syncState = JSON.parse(fs.readFileSync(syncStatePath, 'utf8'));
      Object.keys(syncState).forEach(key => {
        if (key !== '__genesis' && key !== 'en') {
          generatedSet.add(key);
        }
      });
    }

    const generatedLanguages = Array.from(generatedSet);
    return NextResponse.json({ generatedLanguages });
  } catch (error) {
    console.error('Error fetching generated languages:', error);
    return NextResponse.json({ error: 'Failed to fetch generated languages' }, { status: 500 });
  }
}
