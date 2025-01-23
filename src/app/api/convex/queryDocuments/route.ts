import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, geminiApiKey, pineconeApiKey } = body;

    const result = await convex.action(api.documents.queryDocuments, {
      query,
      geminiApiKey,
      pineconeApiKey,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error querying documents:', error);
    return NextResponse.json(
      { error: 'Failed to query documents' },
      { status: 500 }
    );
  }
} 