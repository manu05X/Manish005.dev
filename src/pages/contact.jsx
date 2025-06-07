import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold leading-6 text-zinc-800 dark:text-zinc-100"
        >
          Name
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold leading-6 text-zinc-800 dark:text-zinc-100"
        >
          Email
        </label>
        <div className="mt-2.5">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="subject"
          className="block text-sm font-semibold leading-6 text-zinc-800 dark:text-zinc-100"
        >
          Subject
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block text-sm font-semibold leading-6 text-zinc-800 dark:text-zinc-100"
        >
          Message
        </label>
        <div className="mt-2.5">
          <textarea
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'sending'}
          className="block w-full rounded-md bg-emerald-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </motion.button>
      </div>
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sm:col-span-2 text-sm text-emerald-600 dark:text-emerald-400"
        >
          Thank you for your message! I'll get back to you soon.
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sm:col-span-2 text-sm text-red-600 dark:text-red-400"
        >
          Something went wrong. Please try again later.
        </motion.p>
      )}
    </motion.form>
  )
}

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Manish Kumar</title>
        <meta
          name="description"
          content="Get in touch with me for any questions or opportunities."
        />
      </Head>
      <SimpleLayout
        title="Let's work together"
        intro="I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions."
      >
        <ContactForm />
      </SimpleLayout>
    </>
  )
} 