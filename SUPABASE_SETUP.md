# 🗄️ Supabase Database Setup

Your Supabase database is already connected through Vercel! Now you just need to run the SQL schema to create the tables.

## Step 1: Run the Database Schema

1. Go to your Supabase project (click "Open in Supabase" button in Vercel)
2. Click on **SQL Editor** in the left sidebar
3. Click **+ New Query**
4. Copy the entire contents of `/supabase/schema.sql` from your project
5. Paste it into the SQL Editor
6. Click **Run** or press `Ctrl/Cmd + Enter`

This will create:
- `journal_entries` table with proper structure
- Row Level Security (RLS) policies so users only see their own entries
- Indexes for fast queries
- Automatic timestamp updates

## Step 2: Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** provider is enabled
3. Configure email templates if desired (optional)

## Step 3: Test Locally

Since Vercel already set up your environment variables, you just need to:

```bash
# Install dependencies (includes Supabase)
npm install

# Run locally
npm run dev
```

Visit http://localhost:3000 - you'll be redirected to `/login`

## Step 4: Create Your Account

1. Click "Sign Up"
2. Enter your email and password (min 6 characters)
3. Check your email for confirmation link
4. Click the confirmation link
5. Go back to the app and sign in!

## What Changed

### ✅ **Database Storage**
- Entries now save to Supabase PostgreSQL
- Syncs across all your devices
- Never lost even if you clear browser data

### ✅ **Authentication**
- Email/password login
- Secure user sessions
- Private entries (only you can see yours)

### ✅ **Row Level Security**
- Each user can only:
  - View their own entries
  - Create their own entries
  - Update their own entries
  - Delete their own entries

## Database Schema

```sql
journal_entries (
  id: UUID (primary key)
  user_id: UUID (references auth.users)
  content: TEXT
  mood: TEXT
  sentiment: INTEGER
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
)
```

## Troubleshooting

**"relation journal_entries does not exist"**
- Run the SQL schema in Step 1

**Can't sign up or login**
- Check that Email authentication is enabled in Supabase
- Verify your environment variables are set in Vercel

**Entries not showing**
- Make sure you're logged in
- Check browser console for errors
- Verify RLS policies are enabled

## Migration from localStorage

If you had entries in localStorage before, they won't automatically migrate. You can:
1. Create new entries in the database
2. Or manually copy old entries (they're stored in browser DevTools → Application → Local Storage)

Enjoy your cloud-synced Mood Diary! ☁️✨

