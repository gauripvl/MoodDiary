'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import JournalEditor from './components/JournalEditor'
import EntriesList from './components/EntriesList'

export interface JournalEntry {
  id: string
  content: string
  mood: string
  sentiment: number
  timestamp: number
  user_id?: string
}

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentMood, setCurrentMood] = useState('neutral')
  const [showEntries, setShowEntries] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Check authentication and load entries
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }
      
      setUser(user)
      await loadEntries()
      setLoading(false)
    }

    checkAuth()

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        loadEntries()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadEntries = async () => {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading entries:', error)
      return
    }

    // Convert database format to app format
    const formattedEntries = data.map((entry: any) => ({
      id: entry.id,
      content: entry.content,
      mood: entry.mood,
      sentiment: entry.sentiment,
      timestamp: new Date(entry.created_at).getTime(),
      user_id: entry.user_id,
    }))

    setEntries(formattedEntries)
  }

  const handleSaveEntry = async (entry: JournalEntry) => {
    const { error } = await supabase
      .from('journal_entries')
      .insert({
        content: entry.content,
        mood: entry.mood,
        sentiment: entry.sentiment,
        user_id: user.id,
      })

    if (error) {
      console.error('Error saving entry:', error)
      alert('Failed to save entry. Please try again.')
      return
    }

    // Reload entries to get the new one with its ID
    await loadEntries()
  }

  const handleDeleteEntry = async (id: string) => {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry. Please try again.')
      return
    }

    // Remove from local state
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ 
        background: 'linear-gradient(135deg, #A8B4F5 0%, #C8AFF0 50%, #D4A5F6 100%)',
      }}>
        <div className="text-white text-2xl font-semibold">Loading...</div>
      </div>
    )
  }

  const getMoodGradient = (mood: string) => {
    const gradients = {
      // Very Positive - Warm yellows and oranges (like happy/energetic mood ring)
      'very-positive': 'linear-gradient(135deg, #FFD93D 0%, #FF9A3D 50%, #FF6B9D 100%)',
      // Positive - Greens and blues (like calm/peaceful mood ring)
      'positive': 'linear-gradient(135deg, #6BCF7F 0%, #4ECDC4 50%, #44A8F2 100%)',
      // Neutral - Soft purples and blues (like relaxed mood ring)
      'neutral': 'linear-gradient(135deg, #A8B4F5 0%, #C8AFF0 50%, #D4A5F6 100%)',
      // Negative - Deeper blues and purples (like stressed mood ring)
      'negative': 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #8B5CF6 100%)',
      // Very Negative - Dark purples and grays (like tense mood ring)
      'very-negative': 'linear-gradient(135deg, #434343 0%, #5B4F8A 50%, #2D3561 100%)',
    }
    return gradients[mood as keyof typeof gradients] || gradients.neutral
  }

  return (
    <main 
      className="min-h-screen transition-all duration-[1500ms] ease-in-out"
      style={{ 
        background: getMoodGradient(currentMood),
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              Mood Diary
            </h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition-all"
            >
              Sign Out
            </button>
          </div>
          <p className="text-white/90 text-lg drop-shadow">
            Your journal that feels what you write
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setShowEntries(false)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              !showEntries 
                ? 'bg-white text-purple-600 shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Write Entry
          </button>
          <button
            onClick={() => setShowEntries(true)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              showEntries 
                ? 'bg-white text-purple-600 shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            View Entries ({entries.length})
          </button>
        </div>

        {!showEntries ? (
          <JournalEditor 
            onSave={handleSaveEntry} 
            onMoodChange={setCurrentMood}
          />
        ) : (
          <EntriesList 
            entries={entries} 
            onDelete={handleDeleteEntry}
            onMoodChange={setCurrentMood}
          />
        )}
      </div>
    </main>
  )
}

