// Simple client-side sentiment analyzer
export interface SentimentResult {
  score: number
  comparative: number
}

const positiveWords = [
  'love', 'loved', 'loves', 'loving', 'excellent', 'amazing', 'wonderful', 'fantastic',
  'great', 'good', 'best', 'better', 'happy', 'happiness', 'joy', 'joyful', 'excited',
  'exciting', 'perfect', 'beautiful', 'brilliant', 'awesome', 'incredible', 'outstanding',
  'fabulous', 'delightful', 'superb', 'pleasant', 'pleased', 'grateful', 'thankful',
  'blessed', 'lucky', 'proud', 'success', 'successful', 'celebrate', 'fun', 'enjoy',
  'hope', 'hopeful', 'optimistic', 'positive', 'peaceful', 'calm', 'relaxed', 'content',
  'satisfied', 'inspire', 'inspired', 'uplifting', 'cheerful', 'laugh', 'laughing',
  'smile', 'smiling', 'win', 'winning', 'won', 'achievement', 'accomplish', 'accomplished'
]

const negativeWords = [
  'hate', 'hated', 'hates', 'hating', 'terrible', 'awful', 'horrible', 'bad', 'worst',
  'worse', 'sad', 'sadness', 'depressed', 'depression', 'miserable', 'upset', 'angry',
  'anger', 'frustrated', 'frustration', 'disappointed', 'disappointing', 'fail', 'failed',
  'failure', 'pain', 'painful', 'hurt', 'hurting', 'stressed', 'stress', 'anxious',
  'anxiety', 'worried', 'worry', 'fear', 'afraid', 'scared', 'nervous', 'hopeless',
  'helpless', 'tired', 'exhausted', 'lonely', 'alone', 'cry', 'crying', 'tears',
  'lose', 'losing', 'lost', 'miss', 'missing', 'difficult', 'hard', 'struggle',
  'struggling', 'problem', 'problems', 'issue', 'issues', 'wrong', 'mistake', 'regret'
]

const intensifiers = ['very', 'extremely', 'really', 'so', 'super', 'absolutely', 'completely']

export function analyzeSentiment(text: string): SentimentResult {
  if (!text || text.trim().length === 0) {
    return { score: 0, comparative: 0 }
  }

  const words = text.toLowerCase().match(/\b[\w']+\b/g) || []
  let score = 0
  let intensifier = 1

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    
    // Check for intensifiers
    if (intensifiers.includes(word)) {
      intensifier = 1.5
      continue
    }

    // Check positive words
    if (positiveWords.includes(word)) {
      score += (2 * intensifier)
      intensifier = 1
      continue
    }

    // Check negative words
    if (negativeWords.includes(word)) {
      score -= (2 * intensifier)
      intensifier = 1
      continue
    }

    // Reset intensifier if word wasn't sentiment-bearing
    intensifier = 1
  }

  // Exclamation marks add intensity
  const exclamations = (text.match(/!/g) || []).length
  if (score > 0) {
    score += exclamations * 0.5
  } else if (score < 0) {
    score -= exclamations * 0.5
  }

  // Question marks can indicate uncertainty (slight negative)
  const questions = (text.match(/\?/g) || []).length
  score -= questions * 0.3

  const comparative = words.length > 0 ? score / words.length : 0

  return {
    score: Math.round(score),
    comparative: parseFloat(comparative.toFixed(4))
  }
}

