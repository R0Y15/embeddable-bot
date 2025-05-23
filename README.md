# Embeddable AI Chatbot

A modern, embeddable AI chatbot powered by Google's Gemini model, built with Next.js, shadcn/ui, and Convex.

<div align="center">
  <img src="public/home-page.png" alt="AI Chatbot Demo" width="100%"/>
</div>

## Features

- 🤖 Powered by Google's Gemini AI model
- 🎨 Beautiful UI with shadcn/ui components
- 📱 Responsive design
- 🔌 Easy to embed in any website
- ⚡ Real-time chat interactions

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the demo.

## Embedding the Chatbot

To embed the chatbot in your website, add the following iframe to your HTML:

```html
<iframe 
  src="https://embeddable-bot.vercel.app/widget"
  width="100%"
  height="600px"
  frameBorder="0"
/>
```

## Using the Chat Widget

The chat widget can be imported and used in any React component:

```jsx
import { ChatWidget } from '@/components/ChatWidget';

export default function YourPage() {
  return (
    <div>
      <h1>Your Page Content</h1>
      <ChatWidget />
    </div>
  );
}
```

## Development

- `src/components/Chatbot.tsx` - Main chatbot component
- `src/components/ChatWidget.tsx` - Floating chat widget
- `src/lib/gemini.ts` - Gemini AI configuration
- `src/app/widget/page.tsx` - Embeddable widget page

## License

MIT
