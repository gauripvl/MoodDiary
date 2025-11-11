'use client'

import { useState, useEffect } from 'react'
import JournalEditor from './components/JournalEditor'
import EntriesList from './components/EntriesList'

export interface JournalEntry {
  id: string
  content: string
  mood: string
  sentiment: number
  timestamp: number
}

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentMood, setCurrentMood] = useState('neutral')
  const [showEntries, setShowEntries] = useState(false)

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodDiaryEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('moodDiaryEntries', JSON.stringify(entries))
    }
  }, [entries])

  const handleSaveEntry = (entry: JournalEntry) => {
    setEntries([entry, ...entries])
  }

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id)
    setEntries(updatedEntries)
    if (updatedEntries.length === 0) {
      localStorage.removeItem('moodDiaryEntries')
    }
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
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Mood Diary
          </h1>
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

