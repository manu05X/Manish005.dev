import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Container } from '@/components/Container'
import { getAllBlogs } from '@/lib/markdown'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function EditBlog({ blog }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    readTime: '',
    content: '',
    status: 'draft',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        description: blog.description,
        category: blog.category,
        readTime: blog.readTime,
        content: blog.content,
        status: blog.status || 'draft',
      })
    }
  }, [blog])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // First upload image if selected
      let imageUrl = blog.image
      if (selectedImage) {
        const formData = new FormData()
        formData.append('image', selectedImage)
        formData.append('slug', blog.slug)

        const uploadResponse = await fetch('/api/blogs/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image')
        }

        const { imageUrl: newImageUrl } = await uploadResponse.json()
        imageUrl = newImageUrl
      }

      // Then update the blog post
      const response = await fetch(`/api/blogs/${blog.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: blog.date,
          image: imageUrl,
        }),
      })

      if (response.ok) {
        router.push(`/blogs/${blog.slug}`)
      } else {
        throw new Error('Failed to update blog post')
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
      alert('Failed to update blog post')
    } finally {
      setIsSaving(false)
    }
  }

  if (!blog) {
    return (
      <Container className="mt-16 sm:mt-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Blog post not found
          </h1>
        </div>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <title>Edit Blog - {blog.title}</title>
        <meta name="description" content="Edit blog post" />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Edit Blog Post
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Update your blog post content below. You can use Markdown for formatting.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="mt-10 max-w-2xl">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Description
              </label>
              <textarea
                id="description"
                required
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="readTime"
                  className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Read Time (minutes)
                </label>
                <input
                  type="number"
                  id="readTime"
                  required
                  min="1"
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData({ ...formData, readTime: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 sm:text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Featured Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-zinc-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-emerald-50 file:text-emerald-700
                  hover:file:bg-emerald-100
                  dark:file:bg-emerald-900 dark:file:text-emerald-300"
              />
              {(imagePreview || blog.image) && (
                <div className="mt-2">
                  <img
                    src={imagePreview || blog.image}
                    alt="Preview"
                    className="h-32 w-auto object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Content (Markdown)
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  {showPreview ? (
                    <>
                      <EyeSlashIcon className="h-4 w-4 mr-1" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Show Preview
                    </>
                  )}
                </button>
              </div>
              {showPreview ? (
                <div className="mt-1 prose prose-emerald dark:prose-invert max-w-none rounded-md border border-zinc-300 dark:border-zinc-700 p-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <textarea
                  id="content"
                  required
                  rows={20}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 sm:text-sm font-mono"
                />
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Update Blog'}
              </button>
            </div>
          </div>
        </form>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs()
  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const blogs = await getAllBlogs()
  const blog = blogs.find((b) => b.slug === params.slug)

  if (!blog) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      blog,
    },
  }
} 