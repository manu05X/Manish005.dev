import Head from 'next/head'
import { Container } from '@/components/Container'
import { formatDate } from '@/lib/formatDate'
import { getAllBlogSlugs, getBlogBySlug } from '@/lib/markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function BlogPost({ blog }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/blogs/${blog.slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/blogs')
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

  if (!blog) {
    return (
      <Container className="mt-16 sm:mt-32">
        <h1>Blog post not found</h1>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <title>{blog.title} - Manish Kumar</title>
        <meta name="description" content={blog.description} />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <div className="flex items-center justify-between">
            {blog.status === 'draft' && (
              <div className="mb-8">
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                  Draft
                </span>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <a
                href={`/blogs/edit/${blog.slug}`}
                className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </a>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {blog.title}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {blog.description}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
            <span>•</span>
            <span>{blog.category}</span>
            <span>•</span>
            <span>{blog.readTime} min read</span>
          </div>
        </header>
        {blog.image && (
          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="mt-8 prose prose-emerald dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </div>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllBlogSlugs()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug)
  return {
    props: {
      blog,
    },
  }
} 