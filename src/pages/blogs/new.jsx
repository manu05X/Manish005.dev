import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'

export default function NewBlog() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    readTime: '',
    content: '',
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString().split('T')[0],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save blog post')
      }

      const data = await response.json()
      router.push(`/blogs/${data.slug}`)
    } catch (error) {
      console.error('Error saving blog post:', error)
      alert('Failed to save blog post. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <Head>
        <title>Write New Blog - Manish Kumar</title>
        <meta name="description" content="Write a new blog post" />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Write New Blog
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Share your technical insights and experiences with the community.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-16 sm:mt-20">
          <div className="space-y-8">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-500 sm:text-sm sm:leading-6"
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
                name="description"
                id="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="readTime"
                  className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Read Time
                </label>
                <input
                  type="text"
                  name="readTime"
                  id="readTime"
                  required
                  placeholder="e.g., 5 min read"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Content (Markdown)
              </label>
              <textarea
                name="content"
                id="content"
                rows={20}
                required
                value={formData.content}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-500 sm:text-sm sm:leading-6 font-mono"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                {isSaving ? 'Saving...' : 'Publish Blog'}
              </button>
            </div>
          </div>
        </form>
      </Container>
    </>
  )
} 