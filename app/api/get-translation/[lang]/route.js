import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request, { params }) {
  const { lang } = await params;
  if (!lang) {
     return NextResponse.json({ error: "Missing lang parameter" }, { status: 400 });
  }
  
  const filePath = path.join(process.cwd(), `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: `File ${lang}.json not found` }, { status: 404 });
  }

  const fileData = fs.readFileSync(filePath, 'utf8');
  return new NextResponse(fileData, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
