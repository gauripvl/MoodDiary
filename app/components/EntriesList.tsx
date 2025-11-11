'use client'

import { useState } from 'react'
import { JournalEntry } from '../page'

interface EntriesListProps {
  entries: JournalEntry[]
  onDelete: (id: string) => void
  onMoodChange: (mood: string) => void
}

export default function EntriesList({ entries, onDelete, onMoodChange }: EntriesListProps) {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
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

  const getMoodColor = (mood: string) => {
    const colors = {
      'very-positive': 'bg-yellow-100 border-yellow-300',
      'positive': 'bg-green-100 border-green-300',
      'neutral': 'bg-purple-100 border-purple-300',
      'negative': 'bg-blue-100 border-blue-300',
      'very-negative': 'bg-gray-100 border-gray-400',
    }
    return colors[mood as keyof typeof colors] || 'bg-purple-100 border-purple-300'
  }

  const handleEntryClick = (entry: JournalEntry) => {
    if (selectedEntry === entry.id) {
      setSelectedEntry(null)
      onMoodChange('neutral')
    } else {
      setSelectedEntry(entry.id)
      onMoodChange(entry.mood)
    }
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
        <div className="text-6xl mb-4">📔</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Entries Yet</h3>
        <p className="text-gray-600">
          Start writing your first journal entry to see it here!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Journal Entries
        </h2>
        <p className="text-gray-600">
          Click on any entry to see its full content and relive that mood
        </p>
      </div>

      {entries.map((entry) => (
        <div
          key={entry.id}
          className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all cursor-pointer hover:shadow-xl border-2 ${
            selectedEntry === entry.id ? getMoodColor(entry.mood) : 'border-transparent'
          }`}
          onClick={() => handleEntryClick(entry)}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getMoodEmoji(entry.mood)}</span>
                <div>
                  <div className="cursive-font text-lg text-gray-700 font-semibold">
                    {formatDate(entry.timestamp)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTime(entry.timestamp)} • Sentiment: {entry.sentiment > 0 ? '+' : ''}{entry.sentiment}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm('Are you sure you want to delete this entry?')) {
                    onDelete(entry.id)
                  }
                }}
                className="text-red-400 hover:text-red-600 transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className={`text-gray-700 cursive-font text-xl ${selectedEntry === entry.id ? '' : 'line-clamp-3'}`}>
              {entry.content}
            </div>

            {selectedEntry !== entry.id && entry.content.length > 150 && (
              <div className="mt-2 text-sm text-purple-600 font-medium">
                Click to read more...
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

