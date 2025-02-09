'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export const metadata: Metadata = {
//   title: "Embeddable AI Chatbot",
//   description: "A powerful, customizable AI chatbot that can be embedded in any website",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          <ConvexProvider client={convex}>
            {children}
            <Toaster />
          </ConvexProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
