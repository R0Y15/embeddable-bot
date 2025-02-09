'use client';

import Link from 'next/link';
import { ChatWidget } from '@/components/ChatWidget';
import SplashCursor from '@/blocks/Animations/SplashCursor/SplashCursor';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto min-h-[calc(100vh-4rem)] flex items-center py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold">
              Your AI Assistant,<br />
              Always Ready to Help
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Enhance your website with our intelligent chatbot. Easy to integrate, powerful to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/how-to"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium w-full sm:w-auto text-center"
              >
                Get Started
              </Link>
              <Link
                href="/learn-more"
                className="border border-input hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[600px] flex items-center justify-center">
            <DotLottieReact
              src="https://lottie.host/460d0266-afc1-49a8-8bea-6b80c0bdc94f/xLh5yMM87Q.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
      <ChatWidget />
      <SplashCursor />
    </main>
  );
}
