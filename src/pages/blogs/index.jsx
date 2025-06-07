import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllBlogs } from '@/lib/markdown'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Search } from '@/components/Search'

function BlogCard({ blog }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/blogs/${blog.slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.reload()
      } else {
        throw new Error('Failed to delete blog post')
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
      alert('Failed to delete blog post')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blogs/${blog.slug}`}>
          {blog.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={blog.date}
          className="md:hidden"
          decorate
        >
          {formatDate(blog.date)}
        </Card.Eyebrow>
        <Card.Description>{blog.description}</Card.Description>
        <div className="flex items-center justify-between mt-4">
          <Card.Cta>Read blog</Card.Cta>
          <div className="flex items-center space-x-2">
            <Link
              href={`/blogs/edit/${blog.slug}`}
              className="rounded-md p-2 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              onClick={(e) => e.stopPropagation()}
            >
              <PencilIcon className="h-5 w-5" />
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-md p-2 text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(blog.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function Blogs({ blogs: initialBlogs = [] }) {
  const [blogs, setBlogs] = useState(initialBlogs || [])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query) {
      setBlogs(initialBlogs || [])
      return
    }

    const filteredBlogs = (initialBlogs || []).filter((blog) => {
      const searchContent = `${blog.title} ${blog.description} ${blog.category}`.toLowerCase()
      return searchContent.includes(query.toLowerCase())
    })
    setBlogs(filteredBlogs)
  }

  return (
    <>
      <Head>
        <title>Blogs - Manish Kumar</title>
        <meta name="description" content="Read my thoughts on software development, design, and more." />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Blogs : Writing on software.
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              Thoughts, stories and ideas.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Search onSearch={handleSearch} />
            <Link
              href="/blogs/new"
              className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Write New Blog
            </Link>
          </div>
        </div>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))
            ) : (
              <div className="text-center text-zinc-600 dark:text-zinc-400">
                {searchQuery ? `No blogs found matching "${searchQuery}"` : 'No blogs available'}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  try {
    const blogs = await getAllBlogs()
    console.log('Fetched blogs:', blogs)

    if (!blogs || blogs.length === 0) {
      console.warn('No blogs found in the content directory')
    }

    return {
      props: {
        blogs: blogs || [],
      },
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      props: {
        blogs: [],
      },
    }
  }
} 