# 🌈 Mood Diary

A beautiful, interactive journal application that changes its background like a mood ring based on the emotional tone of your writing. Built with Next.js, TypeScript, and Tailwind CSS.

![Mood Diary](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📝 **Write Journal Entries** - Express your thoughts and feelings in a ruled diary format
- 🎨 **Mood Ring Effect** - Background changes color based on your writing's emotional tone
- 🧠 **Real-time Sentiment Analysis** - Analyzes the mood of your text as you type
- 🎵 **Taylor Swift Song Matching** - AI-powered feature that matches your journal entry with the perfect Taylor Swift song based on your mood and content
- ✨ **Era-Specific Animated GIFs** - Shows an animated Taylor Swift GIF from the same era as the recommended song
- ✍️ **Cursive Handwriting** - Beautiful handwritten font for authentic diary feel
- 📄 **Ruled Paper Design** - Classic notebook lines with red margin
- 🔐 **User Authentication** - Secure login with email/password
- ☁️ **Cloud Storage** - Your entries are saved to Supabase and sync across devices
- 🔒 **Private & Secure** - Row-level security ensures only you can see your entries
- 📅 **Automatic Dating** - Each entry is automatically dated
- 📱 **Responsive Design** - Works beautifully on all devices
- 🎭 **5 Mood States** - Very Positive, Positive, Neutral, Negative, Very Negative

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed on your computer
- A text editor (VS Code recommended)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Database (Supabase)**
   
   See **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** for complete database setup instructions.
   
   **Quick version:**
   - Your Supabase is already connected through Vercel
   - Run the SQL schema from `/supabase/schema.sql` in Supabase SQL Editor
   - Enable Email authentication in Supabase dashboard
   
3. **Set Up API Keys (for Taylor Swift song matching & GIFs)**
   
   If deploying locally, create a `.env.local` file:
   ```bash
   # Supabase (get from Vercel environment variables or Supabase dashboard)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Optional: Taylor Swift features
   OPENAI_API_KEY=your_openai_api_key_here
   GIPHY_API_KEY=your_giphy_api_key_here
   ```
   
   Get your API keys:
   - **Supabase**: Already in Vercel (or get from Supabase dashboard → Project Settings → API)
   - **OpenAI**: [OpenAI Platform](https://platform.openai.com/api-keys)
   - **Giphy**: [Giphy Developers](https://developers.giphy.com/) (free tier available)
   
   > Note: Supabase keys are required. Taylor Swift song matching and GIFs are optional features.

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Create Your Account**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You'll be redirected to `/login`
   - Click "Sign Up" and create your account
   - Check your email for confirmation link
   - Sign in and start journaling!

## 🌐 Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy your Mood Diary app. It's free and takes less than 2 minutes!

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Mood Diary"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Deploy" (Vercel auto-detects Next.js settings!)
   - Your app will be live in ~1 minute! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts, and your app will be deployed!

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Add Environment Variables to Vercel

To enable the Taylor Swift song matching feature on Vercel:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Settings" → "Environment Variables"
3. Add both:
   - `OPENAI_API_KEY` with your OpenAI API key
   - `GIPHY_API_KEY` with your Giphy API key
4. Redeploy your app

Or use the CLI:
```bash
vercel env add OPENAI_API_KEY
vercel env add GIPHY_API_KEY
```

## 📖 How It Works

### Sentiment Analysis
The app uses a custom client-side sentiment analyzer to analyze the emotional tone of your writing in real-time:
- **Score > 5**: Very Positive 🌟 (warm yellows and oranges)
- **Score 2-5**: Positive 😊 (greens and blues)
- **Score -2 to 2**: Neutral 😐 (soft purples)
- **Score -5 to -2**: Negative 😔 (deeper purples)
- **Score < -5**: Very Negative 😢 (dark purples and grays)

### Mood Ring Colors
The background gradient transitions smoothly (1.5 seconds) between mood states:
- 🌟 Very Positive: Warm yellows, oranges, pinks
- 😊 Positive: Calming greens and blues
- 😐 Neutral: Soft purples and lavenders
- 😔 Negative: Deeper blues and purples
- 😢 Very Negative: Dark purples and grays

### Taylor Swift Song Matching 🎵
The AI-powered song matching feature:
1. Analyzes your entire journal entry content
2. Considers your mood and sentiment score
3. Uses OpenAI's GPT to match your emotional state with the perfect Taylor Swift song
4. Provides the song title, album, and an explanation of why it matches
5. Shows an animated GIF of Taylor Swift from that specific era/album
6. References themes and emotions without reproducing copyrighted lyrics

**How to use:**
- Write at least 20 characters in your journal entry
- Click the "Match with a Taylor Swift Song" button
- Get a personalized song recommendation with an era-specific animated GIF!

**Supported eras:**
- Debut, Fearless, Speak Now, Red, 1989, reputation, Lover, folklore, evermore, Midnights, The Tortured Poets Department

> **Note**: This feature requires OpenAI and Giphy API keys. See installation instructions above.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Sentiment Analysis**: Custom client-side analyzer
- **AI Integration**: [OpenAI API](https://openai.com/) for Taylor Swift song matching
- **Fonts**: Google Fonts (Caveat, Indie Flower, Kalam)
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
MoodDiary/
├── app/
│   ├── api/
│   │   ├── match-song/
│   │   │   └── route.ts         # OpenAI API endpoint
│   │   └── get-taylor-gif/
│   │       └── route.ts         # Giphy API endpoint
│   ├── components/
│   │   ├── JournalEditor.tsx    # Main writing interface
│   │   ├── EntriesList.tsx      # Display saved entries
│   │   ├── RuledTextarea.tsx    # Ruled paper component
│   │   └── TaylorSongMatch.tsx  # Song matching UI
│   ├── utils/
│   │   └── sentimentAnalyzer.ts # Sentiment analysis logic
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── public/                      # Static assets
├── .env.local                   # Environment variables (create this!)
├── package.json                 # Dependencies
└── README.md                    # This file!
```

## 🎨 Customization

### Change Mood Colors
Edit the `getMoodGradient` function in `app/page.tsx`:

```typescript
const gradients = {
  'very-positive': 'linear-gradient(135deg, #YOUR_COLORS)',
  // ... add your custom gradients
}
```

### Adjust Sentiment Thresholds
Edit the mood mapping in `app/components/JournalEditor.tsx`:

```typescript
if (result.score >= 5) mood = 'very-positive'
// ... adjust these numbers
```

## 🐛 Troubleshooting

**Problem**: Entries not saving
- **Solution**: Check browser console for localStorage errors. Some browsers block localStorage in private mode.

**Problem**: Background not changing
- **Solution**: Write at least 10 characters to trigger sentiment analysis.

**Problem**: Build fails on Vercel
- **Solution**: Make sure `package.json` has all dependencies listed.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes!

## 🤝 Contributing

Feel free to fork this project and make it your own! Some ideas:
- Add cloud storage (Firebase, Supabase)
- Export entries as PDF
- Add tags and categories
- Implement search functionality
- Add mood statistics/charts

## ❤️ Acknowledgments

- Inspired by the nostalgic mood rings of the 90s
- Built with love using modern web technologies

---

**Happy Journaling! 📔✨**

For questions or issues, please open an issue on GitHub.

