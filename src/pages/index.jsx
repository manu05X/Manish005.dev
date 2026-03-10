import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'
import { ToolsSection } from '@/components/home/ToolsSection'
import { Photos } from '@/components/home/Photos'
import { formatDate } from '@/lib/formatDate'
import SkillCategory from '@/components/SkillCategory'

const GitHubCalendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
})

const Globe = dynamic(() => import('@/components/Globe'), {
  ssr: false,
})

import {
    MediumIcon,
    GitHubIcon,
    LinkedInIcon,
    TwitterIcon,
    InstagramIcon,
    BriefcaseIcon,
    SocialLink,
    ArrowDownIcon,
  } from '@/components/SocialIcons'

import logoFalco from '@/images/projects/falco.svg'
import logoSamsung from '@/images/logos/samsung.gif'
import logoNike from '@/images/nikelogo.jpg'
import logoJU from '@/images/logos/Ju_logo.png'

function Resume() {
    const handleDownloadCV = () => {
      const a = document.createElement('a')
      a.href = '/resources/ManishCV.pdf'
      a.download = 'Manish-Kumar-Resume.pdf'
      a.click()
    };
  
    let resume = [
      {
        company: 'Nike - Bangalore',
        title: 'Software Developer Engineer II',
        logo: logoNike,
        start: 'Jan 2025',
        end: {
          label: 'Present',
          dateTime: new Date().getFullYear(),
        },
      },
      {
        company: 'Samsung India - Bangalore',
        logo: logoSamsung,
        roles: [
          {
            title: 'Associate Staff Engineer',
            start: 'April 2024',
            end: 'Oct 2024'
          },
          {
            title: 'Senior Software Engineer',
            start: 'July 2021',
            end: 'March 2024'
          }
        ]
      },
      {
        company: 'Zen Construction  -  Bangalore',
        title: 'Web Developer',
        logo: logoFalco,
        start: 'Nov 2023',
        end: {
          label: 'Part-Time',
          dateTime: new Date().getFullYear(),
        },
      },
      {
        company: 'Jadavpur University',
        title: 'B.E in Information Technology',
        logo: logoJU,
        start: 'July 2017',
        end: 'April 2021',
      },
    ]
  
    return (
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Work</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {resume.map((role, roleIndex) => (
            <li key={roleIndex} className="flex gap-4">
              <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image src={role.logo} alt="" className="h-full w-full object-cover" unoptimized />
              </div>
              <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {role.company}
                </dd>
                {role.roles ? (
                  role.roles.map((subRole, index) => (
                    <div key={index} className="mt-1 flex justify-between items-center w-full">
                      <dt className="sr-only">Role</dt>
                      <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                        {subRole.title}
                      </dd>
                      <dt className="sr-only">Date</dt>
                      <dd className="text-xs text-zinc-400 dark:text-zinc-500">
                        <time dateTime={subRole.start}>{subRole.start}</time>{' '}
                        <span aria-hidden="true">—</span>{' '}
                        <time dateTime={subRole.end}>{subRole.end}</time>
                      </dd>
                    </div>
                  ))
                ) : (
                  <div className="mt-1 flex justify-between items-center w-full">
                    <dt className="sr-only">Role</dt>
                    <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                      {role.title}
                    </dd>
                    <dt className="sr-only">Date</dt>
                    <dd className="text-xs text-zinc-400 dark:text-zinc-500">
                      <time dateTime={role.start}>{role.start}</time>{' '}
                      <span aria-hidden="true">—</span>{' '}
                      {typeof role.end === 'object' ? (
                        <time dateTime={role.end.dateTime}>
                          {role.end.label}
                        </time>
                      ) : (
                        <time dateTime={role.end}>{role.end}</time>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex gap-3">
          <MagneticButton className="flex-1">
            <Button onClick={handleDownloadCV} variant="secondary" className="group w-full">
              Download CV
              <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
            </Button>
          </MagneticButton>
          <MagneticButton className="flex-1">
            <Link
              href="/resume"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70"
            >
              View Full Resume
            </Link>
          </MagneticButton>
        </div>
      </div>
    )
  }

// ── Typewriter that cycles through roles ────────────────────────────────────
const ROLES = [
  'SDE II at Nike',
  'System Design Enthusiast',
  'Full-Stack Engineer',
  'Open Source Contributor',
  'Backend Architecture Fan',
]

function TypewriterText({ texts, className }) {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState('typing') // typing | waiting | deleting

  useEffect(() => {
    const current = texts[index]
    let id
    if (phase === 'typing') {
      if (display.length < current.length) {
        id = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 65)
      } else {
        id = setTimeout(() => setPhase('waiting'), 2200)
      }
    } else if (phase === 'waiting') {
      id = setTimeout(() => setPhase('deleting'), 120)
    } else {
      if (display.length > 0) {
        id = setTimeout(() => setDisplay(display.slice(0, -1)), 38)
      } else {
        setIndex((i) => (i + 1) % texts.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(id)
  }, [display, phase, index, texts])

  return (
    <span className={className}>
      {display}
      <span className="cursor-blink ml-0.5 inline-block w-[2px] h-[1.1em] align-middle bg-teal-400 rounded-sm" />
    </span>
  )
}

// ── Split-text letter-by-letter reveal ─────────────────────────────────────
function SplitTextHeading({ text, className }) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.038, delayChildren: 0.05 } },
  }
  const letter = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  }
  return (
    <motion.h1
      className={className}
      style={{}}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </motion.h1>
  )
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null)

  function handleMouseMove(e) {
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx('inline-block transition-transform duration-200', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function useIsDark() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    const update = () => setIsDark(root.classList.contains('dark'))
    update()
    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return isDark
}

function ArticleCard({ article }) {
  const isMedium = article.source === 'medium'
  const href = isMedium ? article.link : `/articles/${article.slug}`
  const linkProps = isMedium
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      href={href}
      {...linkProps}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition-all duration-300 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-200/50 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:shadow-zinc-900/50"
    >
      {article.thumbnail && (
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={article.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {isMedium && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
              Medium
            </span>
          )}
        </div>
        <h3 className="mt-2 text-sm font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-teal-500 dark:text-zinc-100 dark:group-hover:text-teal-400 sm:text-base">
          {article.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
          {article.description}
        </p>
        <span className="mt-3 flex items-center gap-1 text-sm font-medium text-teal-500">
          {isMedium ? 'Read on Medium' : 'Read article'}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 stroke-current transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </a>
  )
}

export default function Home({ articles }) {
  const isDark = useIsDark()
  return (
    <>
      <Head>
        <title>
          Manish Kumar - Software Engineer, Open Source, Travel
        </title>
        <meta
          name="description"
          content="I'm Manish, a Software Developer Engineer II at Nike. I build resilient, high-scale web platforms and love turning complex problems into elegant solutions."
        />
      </Head>
      {/* ── Grain overlay ───────────────────────────────────────── */}
      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative">
        <div className="hero-mesh" aria-hidden="true" />

        <Container className="relative z-10 mt-9 pb-4">
          <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-5 lg:gap-x-4">

            {/* ── Left column ─────────────────────────────────────── */}
            <div className="lg:col-span-3">

              {/* "Currently at Nike" live badge */}
              <motion.div
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-3 py-1.5 shadow-sm backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-800/60"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="live-dot" aria-hidden="true" />
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  Currently building at{' '}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Nike</span>
                  , Bangalore
                </span>
              </motion.div>

              {/* Split-text heading */}
              <SplitTextHeading
                text="Hey, I'm Manish."
                className="font-display text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl lg:text-6xl"
              />

              {/* Typewriter role */}
              <p className="mt-4 h-10 text-2xl font-bold sm:text-3xl">
                <TypewriterText texts={ROLES} className="shimmer-text" />
              </p>

              {/* Extended bio */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  I&apos;m a Software Engineer with{' '}
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">5+ years</span>{' '}
                  of experience building high-scale backend systems and full-stack
                  products. At{' '}
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">Nike</span>, I architect
                  microservices and distributed platforms that power e-commerce
                  experiences for millions of users worldwide. Before that, at{' '}
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">Samsung</span>, I led
                  backend engineering for Galaxy Store and Smart TV ecosystems — driving
                  performance, reliability, and scale across 190+ countries.
                </p>
                {/* <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  I&apos;m passionate about{' '}
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">system design</span>,
                  clean architecture, and the craft of writing software that lasts.
                  Outside work: open source contributions, technical writing on Medium,
                  travel photography, and a steady diet of chai.
                </p> */}
                <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  I&apos;m a <span className="font-medium text-zinc-800 dark:text-zinc-200">curious AI learner</span> and 
                  dedicated problem solver who views software architecture as digital craftsmanship. 
                  Outside of architecting high-scale systems, I find inspiration in <span className="font-medium text-zinc-800 dark:text-zinc-200">art and drawing</span>, 
                  using the same principles of composition to visualize elegant technical solutions. 
                  When I&apos;m not sketching or exploring new AI models, you&apos;ll find me contributing to open source, 
                  technical writing on Medium, or capturing the world through travel photography.
                </p>

                {/* Tech pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'React', 'Next.js', 'AWS', 'Kubernetes', 'System Design', 'Microservices'].map((tag) => (
                    <span key={tag} className="tech-pill">{tag}</span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="mt-7 flex items-center gap-6">
                  {[
                    { value: '5+',   label: 'Years Exp.' },
                    { value: '2',    label: 'FAANG / MNC' },
                    { value: '7+',   label: 'Projects' },
                    { value: '190+', label: 'Countries' },
                  ].map(({ value, label }, i, arr) => (
                    <React.Fragment key={label}>
                      <div className="text-center">
                        <div className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">{value}</div>
                        <div className="mt-0.5 text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">{label}</div>
                      </div>
                      {i < arr.length - 1 && <div className="stat-divider h-10" />}
                    </React.Fragment>
                  ))}
                </div>

                {/* Social links */}
                <div className="mt-8 flex gap-6">
                  <SocialLink href="https://twitter.com/" aria-label="Follow on Twitter" icon={TwitterIcon} />
                  <SocialLink href="https://github.com/manu05X" aria-label="Follow on GitHub" icon={GitHubIcon} />
                  <SocialLink href="https://www.linkedin.com/in/manishkumar005/" aria-label="Follow on LinkedIn" icon={LinkedInIcon} />
                  <SocialLink href="https://www.instagram.com/_manu__005/" aria-label="Follow on Instagram" icon={InstagramIcon} />
                  <SocialLink href="https://medium.com/@k.manu00005" aria-label="Follow on Medium" icon={MediumIcon} />
                </div>
              </motion.div>
            </div>

            {/* ── Globe column ─────────────────────────────────────── */}
            <motion.div
              className="globe-wrapper hidden lg:flex lg:col-span-2 overflow-visible"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Globe isDark={isDark} size={420} />
            </motion.div>

          </div>
        </Container>
      </div>

      <Container className="mt-24 md:mt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          <motion.div variants={staggerItem} className="lg:col-span-1">
            <Resume />
          </motion.div>
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <ToolsSection title="Skills">
              <SkillCategory 
                title="Programming Languages" 
                skills={['Java', 'JavaScript', 'TypeScript', 'Python', 'C++', 'Golang']} 
              />
              <SkillCategory 
                title="Web Technologies" 
                skills={['Spring Boot', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes']} 
              />
              <SkillCategory 
                title="Tools & Practices" 
                skills={['Git & GitHub', 'GitHub Copilot', 'Jira', 'Agile/Scrum', 'CI/CD', 'Microservices', 'System Design']} 
              />
            </ToolsSection>
          </motion.div>
        </motion.div>
      </Container>

      <Container className="mt-24 md:mt-28">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
        >
          <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6 flex-none stroke-zinc-500">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span className="ml-3">GitHub Contributions</span>
          </h2>
          <div className="mt-6 overflow-x-auto">
            <GitHubCalendar
              username="manu05X"
              colorScheme={isDark ? 'dark' : 'light'}
              blockSize={13}
              blockMargin={4}
              fontSize={14}
            />
          </div>
        </motion.div>
      </Container>

      {articles && articles.length > 0 && (
        <Container className="mt-24 md:mt-28">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                Latest Articles
              </h2>
              <Link
                href="/articles"
                className="text-sm font-medium text-teal-500 transition hover:text-teal-600"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </motion.div>
        </Container>
      )}

      <Photos />
    </>
  )
}

export async function getStaticProps() {
  const { getMediumArticles } = await import('@/lib/medium')

  const mediumArticles = await getMediumArticles()

  const articles = mediumArticles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)

  return {
    props: { articles },
    revalidate: 3600,
  }
}
