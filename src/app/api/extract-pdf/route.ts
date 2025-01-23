import { NextResponse } from "next/server";
import * as pdfjsLib from "pdfjs-dist";

// Initialize pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function POST(request: Request) {
  try {
    // Get the PDF buffer from the request
    const pdfBuffer = await request.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = "";
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n\n";
    }

    // Clean up the text
    fullText = fullText
      .replace(/\s+/g, " ")
      .trim();

    return NextResponse.json({ text: fullText });
  } catch (error: any) {
    console.error("Error extracting PDF text:", error);
    return NextResponse.json(
      { error: error.message || "Failed to extract PDF text" },
      { status: 500 }
    );
  }
} 