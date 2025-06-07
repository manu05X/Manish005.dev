import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blogs')

export default async function handler(req, res) {
  const { slug } = req.query

  if (req.method === 'DELETE') {
    try {
      const filePath = path.join(postsDirectory, `${slug}.md`)
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Blog post not found' })
      }

      // Delete the file
      fs.unlinkSync(filePath)
      
      res.status(200).json({ message: 'Blog post deleted successfully' })
    } catch (error) {
      console.error('Error deleting blog post:', error)
      res.status(500).json({ message: 'Error deleting blog post' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, description, category, readTime, content, date } = req.body
      const filePath = path.join(postsDirectory, `${slug}.md`)

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Blog post not found' })
      }

      // Create frontmatter
      const frontmatter = matter.stringify(content, {
        title,
        description,
        category,
        readTime,
        date,
      })

      // Write the updated blog post
      fs.writeFileSync(filePath, frontmatter)
      
      res.status(200).json({ message: 'Blog post updated successfully' })
    } catch (error) {
      console.error('Error updating blog post:', error)
      res.status(500).json({ message: 'Error updating blog post' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
} 