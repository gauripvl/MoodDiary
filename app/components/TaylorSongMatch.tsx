'use client'

import { useState } from 'react'

interface SongRecommendation {
  songTitle: string
  album: string
  reason: string
  gifUrl?: string
  gifTitle?: string
}

interface TaylorSongMatchProps {
  content: string
  mood: string
  sentiment: number
}

export default function TaylorSongMatch({ content, mood, sentiment }: TaylorSongMatchProps) {
  const [recommendation, setRecommendation] = useState<SongRecommendation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const matchSong = async () => {
    if (content.length < 20) {
      setError('Write at least 20 characters to get a song match!')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/match-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, mood, sentiment }),
      })

      if (!response.ok) {
        throw new Error('Failed to match song')
      }

      const data = await response.json()
      
      // Fetch era-specific GIF
      try {
        const gifResponse = await fetch('/api/get-taylor-gif', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ album: data.album }),
        })

        if (gifResponse.ok) {
          const gifData = await gifResponse.json()
          data.gifUrl = gifData.gifUrl
          data.gifTitle = gifData.gifTitle
        }
      } catch (gifError) {
        console.log('Could not fetch GIF, continuing without it')
      }

      setRecommendation(data)
    } catch (err) {
      setError('Could not match a song. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6">
      {!recommendation && !loading && (
        <button
          onClick={matchSong}
          disabled={content.length < 20}
          className="w-full px-6 py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <span className="text-2xl">🎵</span>
          <span>Match with a Taylor Swift Song</span>
        </button>
      )}

      {loading && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent mb-3"></div>
          <p className="text-purple-600 font-medium">Finding your perfect Taylor Swift song...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {recommendation && (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-6 shadow-lg">
          {/* Taylor Swift GIF from the era */}
          {recommendation.gifUrl && (
            <div className="mb-4 rounded-xl overflow-hidden border-2 border-pink-300 shadow-md">
              <img 
                src={recommendation.gifUrl} 
                alt={recommendation.gifTitle || 'Taylor Swift'}
                className="w-full h-auto"
              />
            </div>
          )}
          
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎵</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {recommendation.songTitle}
              </h3>
              <p className="text-sm text-purple-600 font-medium mb-3">
                {recommendation.album}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {recommendation.reason}
              </p>
            </div>
          </div>
          <button
            onClick={() => setRecommendation(null)}
            className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium underline"
          >
            Get another recommendation
          </button>
        </div>
      )}
    </div>
  )
}

