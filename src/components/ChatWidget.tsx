'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X } from 'lucide-react';
import { Chatbot } from './Chatbot';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {isOpen ? (
        <div className="mb-4 rounded-lg shadow-lg">
          <div className="bg-primary px-4 py-2 rounded-t-lg flex justify-between items-center">
            <span className="text-primary-foreground font-medium">Chat Support</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Chatbot />
        </div>
      ) : (
        <Button
          size="lg"
          className="rounded-full h-12 w-12 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}