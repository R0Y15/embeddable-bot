import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { NextResponse } from "next/server";

// Create the client outside of the handler
const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return new Response(
      JSON.stringify({ error: "Convex URL not configured" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { fileId } = await request.json();
    
    if (!fileId) {
      return new Response(
        JSON.stringify({ error: "File ID is required" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get the file content
    const file = await client.mutation(api.files.getFile, { fileId });
    if (!file) {
      return new Response(
        JSON.stringify({ error: "File not found" }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const fileUrl = await client.mutation(api.files.getFileUrl, { storageId: file.storageId });
    if (!fileUrl) {
      return new Response(
        JSON.stringify({ error: "Failed to get file URL" }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Download and process the file
    const response = await fetch(fileUrl);
    const text = await response.text();

    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "No text content extracted from file" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Process the file using Convex action
    const documentId = await client.action(api.documents.processFile, {
      fileId,
      text,
      geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "",
      pineconeApiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY ?? "",
    });

    return new Response(
      JSON.stringify({ documentId }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error("Error processing file:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process file" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 