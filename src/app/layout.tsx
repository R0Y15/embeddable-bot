'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export const metadata: Metadata = {
//   title: "AI Chatbot",
//   description: "An embeddable AI chatbot powered by Gemini",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexProvider client={convex}>
          {children}
          <Toaster />
        </ConvexProvider>
      </body>
    </html>
  );
}
