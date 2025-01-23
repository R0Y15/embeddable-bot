import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    console.log("Processing file request received");
    const body = await request.json();
    const { fileId, geminiApiKey, pineconeApiKey } = body;

    if (!fileId) {
      console.error("Missing fileId in request");
      return NextResponse.json(
        { error: "Missing fileId" },
        { status: 400 }
      );
    }

    if (!geminiApiKey) {
      console.error("Missing Gemini API key");
      return NextResponse.json(
        { error: "Missing Gemini API key" },
        { status: 400 }
      );
    }

    console.log("Processing file with ID:", fileId);

    // Get file content
    const file = await convex.mutation(api.files.getFile, { fileId });
    if (!file) throw new Error("File not found");

    const fileUrl = await convex.mutation(api.files.getFileUrl, { storageId: file.storageId });
    if (!fileUrl) throw new Error("Failed to get file URL");

    const response = await fetch(fileUrl);
    const text = await response.text();

    // Process file
    const documentId = await convex.action(api.documents.processFile, {
      fileId,
      text,
      geminiApiKey,
      pineconeApiKey,
    });

    console.log("File processed successfully");
    return NextResponse.json(documentId);
  } catch (error: any) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: error.message || "Failed to process file" },
      { status: 500 }
    );
  }
} 