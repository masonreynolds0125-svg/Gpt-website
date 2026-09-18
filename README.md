# GPT 5.2 Website

A simple chat website powered by the OpenAI API using the `gpt-5.2-chat-latest` model.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and add your OpenAI API key:
   ```bash
   cp .env.example .env.local
   ```
3. Replace `your_openai_api_key_here` with your actual API key.
4. Run the app:
   ```bash
   npm run dev
   ```
5. Open <http://localhost:3000>

## Deploy

This project is ready to deploy on Vercel. Add the same environment variables in your Vercel project settings:

- `OPENAI_API_KEY`
- `OPENAI_MODEL=gpt-5.2-chat-latest`

## Note

Do not expose your API key in browser code. This app keeps the key server-side in the Next.js API route.
