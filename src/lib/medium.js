import Parser from 'rss-parser'
import https from 'https'

const MEDIUM_FEED_URL = 'https://medium.com/feed/@k.manu00005'

const agent = new https.Agent({ rejectUnauthorized: false })

const parser = new Parser({
  customFields: {
    item: [['content:encoded', 'contentEncoded']],
  },
  requestOptions: {
    agent,
  },
})

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').trim()
}

function extractFirstImage(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/)
  return match ? match[1] : null
}

function extractDescription(html, maxLength = 200) {
  const text = stripHtml(html)
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

export async function getMediumArticles() {
  try {
    const feed = await parser.parseURL(MEDIUM_FEED_URL)

    return feed.items.map((item) => ({
      title: item.title,
      description: extractDescription(item.contentEncoded || item.content || ''),
      date: new Date(item.pubDate).toISOString().split('T')[0],
      slug: item.link,
      link: item.link,
      thumbnail: extractFirstImage(item.contentEncoded || item.content || ''),
      categories: item.categories || [],
      source: 'medium',
      author: item.creator || 'Manish Kumar',
    }))
  } catch (error) {
    console.error('Failed to fetch Medium articles:', error)
    return []
  }
}
