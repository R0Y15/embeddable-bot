// Use Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
const pdfParse = require('pdf-parse');

// Custom render callback for better text extraction
async function renderPage(pageData: any) {
  const renderOptions = {
    normalizeWhitespace: true,
    disableCombineTextItems: false
  };

  try {
    const textContent = await pageData.getTextContent(renderOptions);
    let lastY;
    let text = '';

    for (const item of textContent.items) {
      if (lastY == item.transform[5] || !lastY) {
        text += item.str;
      } else {
        text += '\n' + item.str;
      }
      lastY = item.transform[5];
    }

    return text;
  } catch (error) {
    console.error('Error in renderPage:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    console.log("Starting PDF parsing request");
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      console.error("No valid file provided");
      return NextResponse.json(
        { error: 'No valid file provided' },
        { status: 400 }
      );
    }

    console.log("File received, size:", file.size);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log("Starting PDF parsing");
    const data = await pdfParse(buffer);
    
    if (!data || !data.text) {
      console.error("No text content found in PDF");
      return NextResponse.json(
        { error: 'No text content found in PDF' },
        { status: 400 }
      );
    }

    console.log("PDF parsed successfully, text length:", data.text.length);
    console.log("First 100 characters:", data.text.substring(0, 100));
    
    // Clean up the extracted text
    const cleanText = data.text
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!cleanText) {
      console.error("No text content after cleaning");
      return NextResponse.json(
        { error: 'No text content after cleaning' },
        { status: 400 }
      );
    }

    console.log("Text cleaned, final length:", cleanText.length);
    return NextResponse.json({ text: cleanText });
  } catch (error: any) {
    console.error('Error parsing PDF:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to parse PDF',
        details: error.stack
      },
      { status: 500 }
    );
  }
} 