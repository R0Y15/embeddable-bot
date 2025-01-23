'use client';

import SplashCursor from '@/blocks/Animations/SplashCursor/SplashCursor'
import { ChatWidget } from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Embeddable AI Chatbot</h1>
        <p className="text-lg text-muted-foreground">
          This is a demo of our embeddable AI chatbot powered by Gemini. Click the chat
          button in the bottom right corner to start a conversation.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How to Embed</h2>
          <p className="mb-4">
            To embed this chatbot in your website, add the following code to your page:
          </p>
          <pre className="bg-background p-4 rounded-md overflow-x-auto">
            <code>{`<iframe 
  src="YOUR_DOMAIN/widget"
  width="100%"
  height="600px"
  frameBorder="0"
/>`}</code>
          </pre>
        </div>
      </div>
      <ChatWidget />

      <SplashCursor />
    </main>
  );
}
