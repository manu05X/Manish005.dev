import Head from 'next/head'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'
import ReCAPTCHA from 'react-google-recaptcha'

// ─────────────────────────────────────────────────────────
// STEP 1: Validation
//
// We validate each field on blur (when user leaves the field)
// AND on submit. Errors appear inline below each field.
// The `validate` function returns an object like:
//   { name: "Name is required", email: "", subject: "", message: "" }
// Empty string = no error.
// ─────────────────────────────────────────────────────────

function validate(formData) {
  const errors = {}

  if (!formData.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!formData.subject.trim()) {
    errors.subject = 'Subject is required'
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required'
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}

function hasErrors(errors) {
  return Object.values(errors).some((msg) => msg)
}

// ─────────────────────────────────────────────────────────
// Inline error component — shows a red message below a field
// ─────────────────────────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1 text-xs text-red-500 dark:text-red-400"
    >
      {message}
    </motion.p>
  )
}

// ─────────────────────────────────────────────────────────
// STEP 4: Alternative contact methods sidebar
//
// Shows email, LinkedIn, and other ways to reach you
// alongside the form so visitors have options.
// ─────────────────────────────────────────────────────────

function ContactInfo() {
  const contacts = [
    {
      label: 'Email',
      value: 'k.manu00005@gmail.com',
      href: 'mailto:k.manu00005@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'manishkumar005',
      href: 'https://www.linkedin.com/in/manishkumar005/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'manu05X',
      href: 'https://github.com/manu05X',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: 'Medium',
      value: '@k.manu00005',
      href: 'https://medium.com/@k.manu00005',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Other ways to reach me
      </h3>
      <ul className="mt-6 space-y-4">
        {contacts.map((contact) => (
          <li key={contact.label}>
            <a
              href={contact.href}
              target={contact.href.startsWith('mailto') ? undefined : '_blank'}
              rel={contact.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-3 text-sm text-zinc-600 transition hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition group-hover:border-teal-300 group-hover:text-teal-500 dark:border-zinc-700 dark:text-zinc-400 dark:group-hover:border-teal-600 dark:group-hover:text-teal-400">
                {contact.icon}
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{contact.label}</p>
                <p className="text-xs">{contact.value}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// STEPS 1-3: The Contact Form
//
// Step 1 — Validation: `errors` state tracks per-field errors.
//          `touched` state tracks which fields the user has
//          interacted with, so we only show errors after blur.
//
// Step 2 — API wiring: `handleSubmit` sends a POST to
//          /api/contact with the form data + reCAPTCHA token.
//          The API uses Nodemailer to email you.
//
// Step 3 — reCAPTCHA: We use react-google-recaptcha (v2 checkbox).
//          The user must complete the captcha before submitting.
//          The token is sent to the API, which verifies it with
//          Google's servers before sending the email.
// ─────────────────────────────────────────────────────────

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('')
  const [apiError, setApiError] = useState('')
  const recaptchaRef = useRef(null)
  const [recaptchaToken, setRecaptchaToken] = useState(null)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] || '' }))
    }
  }, [formData, touched])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validate(formData)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] || '' }))
  }, [formData])

  // ── STEP 2: The actual API call ──
  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    const validationErrors = validate(formData)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (hasErrors(validationErrors)) return

    // STEP 3: Check reCAPTCHA
    if (!recaptchaToken) {
      setApiError('Please complete the reCAPTCHA verification')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTouched({})
      setErrors({})
      setRecaptchaToken(null)
      if (recaptchaRef.current) recaptchaRef.current.reset()
    } catch (error) {
      setStatus('error')
      setApiError(error.message || 'Something went wrong. Please try again.')
    }
  }

  const inputClass = (fieldName) =>
    `block w-full rounded-lg border-0 px-3.5 py-2.5 text-zinc-900 shadow-sm ring-1 ring-inset transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-inset dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 sm:text-sm sm:leading-6 ${
      errors[fieldName] && touched[fieldName]
        ? 'ring-red-300 focus:ring-red-500 dark:ring-red-700 dark:focus:ring-red-500'
        : 'ring-zinc-300 focus:ring-teal-500 dark:ring-zinc-700 dark:focus:ring-teal-500'
    }`

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your full name"
          className={inputClass('name')}
        />
        <FieldError message={touched.name && errors.name} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          className={inputClass('email')}
        />
        <FieldError message={touched.email && errors.email} />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="What is this about?"
          className={inputClass('subject')}
        />
        <FieldError message={touched.subject && errors.subject} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell me about your project, idea, or just say hello..."
          className={inputClass('message')}
        />
        <FieldError message={touched.message && errors.message} />
      </div>

      {/* STEP 3: reCAPTCHA widget */}
      <div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
          onChange={(token) => setRecaptchaToken(token)}
          onExpired={() => setRecaptchaToken(null)}
          theme="dark"
        />
      </div>

      {/* Submit button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>

      {/* Success message */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-800 dark:bg-teal-900/20"
        >
          <p className="text-sm font-medium text-teal-800 dark:text-teal-300">
            Message sent successfully! I&apos;ll get back to you soon.
          </p>
        </motion.div>
      )}

      {/* Error message */}
      {(status === 'error' || apiError) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
        >
          <p className="text-sm font-medium text-red-800 dark:text-red-300">
            {apiError || 'Something went wrong. Please try again later.'}
          </p>
        </motion.div>
      )}
    </motion.form>
  )
}

// ─────────────────────────────────────────────────────────
// Page layout: 2-column grid
// Left = form, Right = contact info sidebar
// ─────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Manish Kumar</title>
        <meta
          name="description"
          content="Get in touch with me for any questions, collaborations, or opportunities."
        />
      </Head>
      <SimpleLayout
        title="Let&apos;s connect"
        intro="Have a project in mind, want to collaborate, or just want to say hello? Drop me a message and I&apos;ll get back to you as soon as I can."
      >
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}
