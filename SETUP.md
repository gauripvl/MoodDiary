# 🎵 Setting Up Taylor Swift Song Matching + Animated GIFs

Follow these steps to enable the AI-powered Taylor Swift song matching feature with era-specific animated GIFs in your Mood Diary!

## Step 1: Get API Keys

### OpenAI API Key (for song matching)

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the API key (you won't be able to see it again!)

> **Cost**: OpenAI has a free tier with $5 credit for new accounts. Song matching uses GPT-3.5-turbo which costs about $0.001 per request (very affordable!)

### Giphy API Key (for animated GIFs)

1. Go to [Giphy Developers](https://developers.giphy.com/)
2. Sign up or log in to your account
3. Click "Create an App"
4. Choose "API" (not SDK)
5. Fill in the app name and description (e.g., "Mood Diary")
6. Copy your API key

> **Cost**: Giphy API is completely free! No credit card required.

## Step 2: Add API Keys to Your Project

Create a file named `.env.local` in the root of your MoodDiary folder:

```bash
OPENAI_API_KEY=sk-your-actual-openai-key-here
GIPHY_API_KEY=your-actual-giphy-key-here
```

**Important**: 
- Replace the placeholder keys with your actual API keys
- The file should be named exactly `.env.local`
- This file is already in `.gitignore` so it won't be committed to Git

## Step 3: Install Dependencies and Restart

```bash
# Install new dependencies (including OpenAI)
npm install

# Restart your development server
npm run dev
```

## Step 4: Test It Out!

1. Open http://localhost:3000
2. Write a journal entry (at least 20 characters)
3. Click the "Match with a Taylor Swift Song" button
4. Get your personalized song recommendation with an animated GIF from that era! 🎵✨

## For Vercel Deployment

If you're deploying to Vercel, you need to add the environment variable there too:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add both keys:
   - **Name**: `OPENAI_API_KEY`
     - **Value**: Your OpenAI API key
     - **Environments**: Production, Preview, Development (check all)
   - **Name**: `GIPHY_API_KEY`
     - **Value**: Your Giphy API key
     - **Environments**: Production, Preview, Development (check all)
5. Redeploy your app

Or via CLI:
```bash
vercel env add OPENAI_API_KEY production
vercel env add GIPHY_API_KEY production
```

## Troubleshooting

**"OpenAI API key not configured" error**
- Make sure `.env.local` exists in the root directory
- Check that the API key is on a line like: `OPENAI_API_KEY=sk-...`
- Restart your dev server after creating `.env.local`

**"Failed to match song" error**
- Check your OpenAI API key is valid
- Make sure you have credits in your OpenAI account
- Check the browser console for more detailed error messages

**Button is disabled**
- You need to write at least 20 characters before the button becomes active

## How It Works

### Song Matching (OpenAI)
Your journal entry content, mood, and sentiment score are sent to OpenAI's GPT-3.5-turbo model, which:
1. Analyzes the emotional themes and content
2. Matches it with Taylor Swift's extensive discography
3. Returns a song title, album, and personalized explanation
4. No lyrics are reproduced (copyright-safe!)

### Animated GIFs (Giphy)
Once the song and album are identified:
1. The album name is mapped to a Taylor Swift era
2. Giphy API searches for GIFs from that specific era
3. A random era-appropriate GIF is displayed with your recommendation
4. Covers all major eras: Debut, Fearless, Speak Now, Red, 1989, reputation, Lover, folklore, evermore, Midnights, TTPD

**Example**: If you write about heartbreak and get "All Too Well (Taylor's Version)" from Red, you'll see a Red era GIF of Taylor!

Enjoy your personalized Taylor Swift soundtrack with visual vibes! 🌟✨

