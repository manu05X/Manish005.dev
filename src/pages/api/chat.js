import { SYSTEM_PROMPT } from '@/lib/chatContext'
import https from 'https'

function openaiRequest(apiKey, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body)
    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(data),
      },
      rejectUnauthorized: false,
    }

    const request = https.request(options, (response) => {
      resolve(response)
    })

    request.on('error', reject)
    request.write(data)
    request.end()
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' })
  }

  const { messages } = req.body || {}

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' })
  }

  const trimmedMessages = messages.slice(-10)

  try {
    const response = await openaiRequest(apiKey, {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...trimmedMessages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 500,
    })

    if (response.statusCode !== 200) {
      let body = ''
      response.on('data', (chunk) => (body += chunk))
      response.on('end', () => {
        console.error('OpenAI API error:', response.statusCode, body)
        if (!res.headersSent) {
          res.status(502).json({ error: 'Failed to get response from AI' })
        }
      })
      return
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Transfer-Encoding', 'chunked')

    let buffer = ''

    response.on('data', (chunk) => {
      buffer += chunk.toString()
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue
        const data = trimmed.slice(6)
        if (data === '[DONE]') {
          res.end()
          return
        }
        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) {
            res.write(content)
          }
        } catch {
          // skip malformed chunks
        }
      }
    })

    response.on('end', () => {
      if (!res.writableEnded) res.end()
    })

    response.on('error', (err) => {
      console.error('Stream error:', err)
      if (!res.writableEnded) res.end()
    })
  } catch (err) {
    console.error('Chat API error:', err)
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal server error' })
    }
    if (!res.writableEnded) res.end()
  }
}
