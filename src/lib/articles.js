import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export function getAllArticles() {
  // Get all article files
  const fileNames = fs.readdirSync(articlesDirectory)
  
  // Get article data from each file
  const articles = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the article metadata section
    const { data, content } = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      content,
      ...data,
    }
  })

  // Sort articles by date
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticleBySlug(slug) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...data,
  }
} 