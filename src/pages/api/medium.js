import { getMediumArticles } from '@/lib/medium'

let cachedArticles = null
let cacheTime = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const now = Date.now()
    if (cachedArticles && now - cacheTime < CACHE_DURATION) {
      return res.status(200).json(cachedArticles)
    }

    const articles = await getMediumArticles()
    cachedArticles = articles
    cacheTime = now

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200')
    return res.status(200).json(articles)
  } catch (error) {
    console.error('Medium API error:', error)
    return res.status(500).json({ error: 'Failed to fetch articles' })
  }
}
