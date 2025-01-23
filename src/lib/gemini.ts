import { api } from "../../convex/_generated/api";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

if (!process.env.NEXT_PUBLIC_PINECONE_API_KEY) {
  throw new Error("Missing PINECONE_API_KEY environment variable");
}

export async function chat(message: string, convex: any, documentContext: string | null = null) {
  try {
    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const pineconeApiKey = process.env.NEXT_PUBLIC_PINECONE_API_KEY;

    if (!geminiApiKey || !pineconeApiKey) {
      console.error("Missing API keys");
      throw new Error("Configuration error: Missing API keys");
    }

    console.log("Sending query to AI...");
    const response = await convex.action(api.documents.queryDocuments, {
      query: message,
      context: documentContext || undefined,
      geminiApiKey,
      pineconeApiKey,
    });

    console.log("Got response:", response);
    if (!response || !response.text) {
      console.error("Invalid response format:", response);
      throw new Error("Invalid response from AI");
    }

    return response;
  } catch (error: any) {
    console.error("Error in chat:", error);
    if (error.message) {
      throw new Error(`AI Error: ${error.message}`);
    }
    throw new Error("Failed to get response from AI, please try again");
  }
} 