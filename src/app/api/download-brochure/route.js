// app/api/download-brochure/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    'public/brochures/AI-ML - Course Brochure- v2.0.pdf'
  );

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      // 👇 inline opens in browser tab
      'Content-Disposition': 'inline; filename="AI-ML - Course Brochure- v2.0.pdf"',
    },
  });
}
