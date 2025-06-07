import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blogs')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { title, description, category, readTime, content, date } = req.body

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Create frontmatter
    const frontmatter = matter.stringify(content, {
      title,
      description,
      date,
      category,
      readTime,
    })

    // Write file
    const filePath = path.join(postsDirectory, `${slug}.md`)
    fs.writeFileSync(filePath, frontmatter)

    res.status(200).json({ slug })
  } catch (error) {
    console.error('Error saving blog post:', error)
    res.status(500).json({ message: 'Error saving blog post' })
  }
} 