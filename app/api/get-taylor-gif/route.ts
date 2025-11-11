import { NextRequest, NextResponse } from 'next/server'

// Map albums to search terms for better GIF results
const albumToSearchTerm: { [key: string]: string } = {
  // Main albums
  'Taylor Swift': 'Taylor Swift debut era',
  'Fearless': 'Taylor Swift Fearless era',
  'Speak Now': 'Taylor Swift Speak Now era',
  'Red': 'Taylor Swift Red era',
  '1989': 'Taylor Swift 1989 era',
  'reputation': 'Taylor Swift reputation era',
  'Lover': 'Taylor Swift Lover era',
  'folklore': 'Taylor Swift folklore era',
  'evermore': 'Taylor Swift evermore era',
  'Midnights': 'Taylor Swift Midnights era',
  'The Tortured Poets Department': 'Taylor Swift TTPD era',
  
  // Taylor's Versions
  'Fearless (Taylor\'s Version)': 'Taylor Swift Fearless era',
  'Red (Taylor\'s Version)': 'Taylor Swift Red era',
  'Speak Now (Taylor\'s Version)': 'Taylor Swift Speak Now era',
  '1989 (Taylor\'s Version)': 'Taylor Swift 1989 era',
}

export async function POST(request: NextRequest) {
  try {
    const { album } = await request.json()

    if (!process.env.GIPHY_API_KEY) {
      // Return a fallback if no Giphy API key
      return NextResponse.json({
        gifUrl: null,
        message: 'Giphy API key not configured'
      })
    }

    // Get search term based on album
    const searchTerm = albumToSearchTerm[album] || `Taylor Swift ${album}`

    // Search Giphy for the era-specific GIF
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=10&rating=g`
    )

    if (!response.ok) {
      throw new Error('Giphy API error')
    }

    const data = await response.json()

    if (data.data && data.data.length > 0) {
      // Pick a random GIF from the results
      const randomIndex = Math.floor(Math.random() * Math.min(data.data.length, 5))
      const gif = data.data[randomIndex]

      return NextResponse.json({
        gifUrl: gif.images.fixed_height.url,
        gifTitle: gif.title,
      })
    }

    // Fallback: search for general Taylor Swift
    const fallbackResponse = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=Taylor+Swift&limit=5&rating=g`
    )

    const fallbackData = await fallbackResponse.json()
    
    if (fallbackData.data && fallbackData.data.length > 0) {
      const gif = fallbackData.data[0]
      return NextResponse.json({
        gifUrl: gif.images.fixed_height.url,
        gifTitle: gif.title,
      })
    }

    return NextResponse.json({ gifUrl: null })
  } catch (error) {
    console.error('Error fetching GIF:', error)
    return NextResponse.json({ gifUrl: null })
  }
}

