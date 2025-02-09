'use client';

import Link from 'next/link';
import { ChatWidget } from '@/components/ChatWidget';

export default function LearnMore() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto py-12">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Link>
        </nav>
        
        <div className="space-y-16">
          {/* Hero Section */}
          <section className="space-y-4">
            <h1 className="text-5xl font-bold">About Our AI Chatbot</h1>
            <p className="text-xl text-muted-foreground">
              A powerful, customizable AI assistant that seamlessly integrates with your website
            </p>
          </section>

          {/* Features Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-semibold">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Easy Integration</h3>
                <p className="text-muted-foreground">
                  Embed our chatbot with just a single line of code. No complex setup required.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Intelligent Responses</h3>
                <p className="text-muted-foreground">
                  Powered by advanced AI to provide accurate and contextual responses to user queries.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Customizable Design</h3>
                <p className="text-muted-foreground">
                  Adapt the chatbot's appearance to match your website's branding and style.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">24/7 Availability</h3>
                <p className="text-muted-foreground">
                  Provide instant support to your users around the clock without human intervention.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="space-y-8">
            <h2 className="text-3xl font-semibold">Technical Details</h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Built with Modern Technology</h3>
                <p className="text-muted-foreground">
                  Our chatbot is built using Next.js 15, React, and Tailwind CSS, ensuring optimal performance and reliability.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Secure & Scalable</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with end-to-end encryption and scalable infrastructure to handle high traffic.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Ready to Get Started?</h2>
            <div className="flex gap-4">
              <Link 
                href="/how-to" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium"
              >
                View Integration Guide
              </Link>
              <a 
                href="https://github.com/R0Y15/embeddable-bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-input hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium"
              >
                View on GitHub
              </a>
            </div>
          </section>
        </div>
      </div>
      <ChatWidget />
    </main>
  );
} 