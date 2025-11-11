'use client'

import { useState, useEffect } from 'react'
import { analyzeSentiment } from '../utils/sentimentAnalyzer'
import { JournalEntry } from '../page'
import RuledTextarea from './RuledTextarea'
import TaylorSongMatch from './TaylorSongMatch'

interface JournalEditorProps {
  onSave: (entry: JournalEntry) => void
  onMoodChange: (mood: string) => void
}

export default function JournalEditor({ onSave, onMoodChange }: JournalEditorProps) {
  const [content, setContent] = useState('')
  const [currentSentiment, setCurrentSentiment] = useState(0)
  const [moodLabel, setMoodLabel] = useState('neutral')
  const [currentDate, setCurrentDate] = useState('')

  // Get current date on mount
  useEffect(() => {
    const date = new Date()
    const formatted = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    setCurrentDate(formatted)
  }, [])

  useEffect(() => {
    if (content.length > 10) {
      const result = analyzeSentiment(content)
      setCurrentSentiment(result.score)
      
      // Map sentiment score to mood
      let mood = 'neutral'
      if (result.score >= 5) mood = 'very-positive'
      else if (result.score >= 2) mood = 'positive'
      else if (result.score <= -5) mood = 'very-negative'
      else if (result.score <= -2) mood = 'negative'
      
      setMoodLabel(mood)
      onMoodChange(mood)
    } else {
      setMoodLabel('neutral')
      onMoodChange('neutral')
    }
  }, [content, onMoodChange])

  const handleSave = () => {
    if (content.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        content: content.trim(),
        mood: moodLabel,
        sentiment: currentSentiment,
        timestamp: Date.now(),
      }
      onSave(entry)
      setContent('')
      setCurrentSentiment(0)
      setMoodLabel('neutral')
      onMoodChange('neutral')
    }
  }

  const getMoodEmoji = (mood: string) => {
    const emojis = {
      'very-positive': '🌟',
      'positive': '😊',
      'neutral': '😐',
      'negative': '😔',
      'very-negative': '😢',
    }
    return emojis[mood as keyof typeof emojis] || '😐'
  }

  const getMoodText = (mood: string) => {
    const texts = {
      'very-positive': 'Very Positive',
      'positive': 'Positive',
      'neutral': 'Neutral',
      'negative': 'Negative',
      'very-negative': 'Very Negative',
    }
    return texts[mood as keyof typeof texts] || 'Neutral'
  }

  return (
    <div className="diary-paper rounded-3xl shadow-2xl p-8 border-2 border-amber-100">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          How are you feeling today?
        </h2>
        <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-full border border-amber-200 shadow-sm">
          <span className="text-3xl">{getMoodEmoji(moodLabel)}</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-700">
              {getMoodText(moodLabel)}
            </div>
            <div className="text-xs text-gray-500">
              Score: {currentSentiment > 0 ? '+' : ''}{currentSentiment}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/40 rounded-2xl border-2 border-gray-300 overflow-hidden shadow-inner">
        {/* Date header */}
        <div className="bg-amber-50/50 border-b-2 border-gray-300 px-6 py-3 flex items-center">
          <div className="absolute left-12 w-0.5 h-full bg-red-300" />
          <span className="cursive-font text-2xl text-gray-700 ml-10">
            {currentDate}
          </span>
        </div>
        
        <RuledTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your thoughts... The background will change as you express your feelings."
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600 cursive-font text-lg">
          {content.length} characters
        </div>
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
        >
          Save Entry
        </button>
      </div>

      <TaylorSongMatch 
        content={content}
        mood={moodLabel}
        sentiment={currentSentiment}
      />

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> The background color changes like a mood ring as you write! 
          Try expressing different emotions to see it transform.
        </p>
      </div>
    </div>
  )
}

