import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { content, mood, sentiment } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a Taylor Swift song recommendation expert. Based on the user's journal entry, mood, and sentiment score, recommend ONE Taylor Swift song that perfectly matches their emotional state and the themes in their writing. 

IMPORTANT: 
- Only recommend actual Taylor Swift songs (include album name)
- DO NOT include any song lyrics
- Explain why this song matches their entry in 2-3 sentences
- Reference the song's themes and emotional tone
- Be empathetic and encouraging

Format your response as JSON:
{
  "songTitle": "Song Name",
  "album": "Album Name",
  "reason": "Why this song matches their mood and entry"
}`
          },
          {
            role: 'user',
            content: `Journal Entry: "${content}"

Mood: ${mood}
Sentiment Score: ${sentiment}

What Taylor Swift song matches this entry?`
          }
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { error: 'OpenAI API error', details: error },
        { status: response.status }
      )
    }

    const data = await response.json()
    const recommendation = JSON.parse(data.choices[0].message.content)

    return NextResponse.json(recommendation)
  } catch (error) {
    console.error('Error matching song:', error)
    return NextResponse.json(
      { error: 'Failed to match song' },
      { status: 500 }
    )
  }
}

