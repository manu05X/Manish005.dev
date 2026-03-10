import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { Container } from '@/components/Container'
import smokeImage from '@/images/photos/Smoke.jpg'
import {
    GitHubIcon,
    LinkedInIcon,
    TwitterIcon,
    MediumIcon,
  } from '@/components/SocialIcons'

function SocialLink({ className, href, children, icon: Icon }) {
    return (
      <li className={clsx(className, 'flex')}>
        <Link
          href={href}
          className="group flex text-sm font-medium text-zinc-800 transition hover:text-emerald-500 dark:text-zinc-200 dark:hover:text-emerald-400"
        >
          <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-emerald-500" />
          <span className="ml-4">{children}</span>
        </Link>
      </li>
    )
  }

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

const milestones = [
  {
    year: '2025',
    title: 'SDE II at Nike',
    description: 'Modernizing Nike\u2019s event platform with secure middleware, JWT auth, and low-latency APIs serving millions of users.',
    icon: '\u{1F3C3}',
    current: true,
  },
  {
    year: '2024',
    title: 'Associate Staff Engineer at Samsung',
    description: 'Promoted to lead cross-team initiatives in software development and research.',
    icon: '\u{1F4C8}',
  },
  {
    year: '2021',
    title: 'Senior Software Engineer at Samsung',
    description: 'Joined Samsung India, Bangalore. Worked on C++, C#, and Python across R&D projects for over three years.',
    icon: '\u{1F4F1}',
  },
  {
    year: '2021',
    title: 'Graduated from Jadavpur University',
    description: 'B.E. in Information Technology from one of India\u2019s premier engineering institutions in Kolkata.',
    icon: '\u{1F393}',
  },
  {
    year: '2017',
    title: 'Started Engineering Journey',
    description: 'Began studying Information Technology at Jadavpur University, discovering a passion for building things on the web.',
    icon: '\u{1F680}',
  },
]

// Bento fun facts — each card has a size hint
const bentoFacts = [
  {
    icon: '\u{1F3A8}',
    title: 'Amateur Artist',
    text: 'I sketch in my free time \u2014 the picture on this page is one of mine.',
    span: 'sm:col-span-2',
    accent: 'from-violet-500/10 to-transparent',
  },
  {
    icon: '\u{1F30D}',
    title: 'Explorer at Heart',
    text: 'Bounced between Asansol, Kolkata, and Bangalore. Always curious about the next city.',
    span: '',
    accent: 'from-emerald-500/10 to-transparent',
  },
  {
    icon: '\u2615',
    title: 'Chai-Powered',
    text: 'Fueled by chai and late-night debugging sessions.',
    span: '',
    accent: 'from-amber-500/10 to-transparent',
  },
  {
    icon: '\u{1F4DD}',
    title: 'Tech Writer',
    text: 'I write about software engineering on Medium.',
    span: '',
    accent: 'from-blue-500/10 to-transparent',
  },
  {
    icon: '\u{1F3B5}',
    title: 'Lo-fi Devotee',
    text: 'Lo-fi beats are my coding soundtrack. Always on in the background.',
    span: 'sm:col-span-2',
    accent: 'from-pink-500/10 to-transparent',
  },
  {
    icon: '\u{1F331}',
    title: 'Open Source Fan',
    text: 'Open source contributor and lifelong learner. Every PR is a small gift to the community.',
    span: '',
    accent: 'from-emerald-500/10 to-transparent',
  },
]

const currently = [
  { label: 'Building', value: 'AI-powered portfolio tools & event platform at Nike', icon: '\u{1F6E0}\uFE0F' },
  { label: 'Reading', value: 'Designing Data-Intensive Applications — Martin Kleppmann', icon: '\u{1F4DA}' },
  { label: 'Learning', value: 'Distributed systems & Kubernetes deep-dive', icon: '\u{1F9E0}' },
  { label: 'Listening', value: 'ChillHop Music & lo-fi coding playlists', icon: '\u{1F3A7}' },
]

// Animated timeline line using Framer Motion
function AnimatedTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="mt-10 relative" ref={ref}>
      {/* Animated vertical line */}
      <motion.div
        className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400 via-violet-400 to-zinc-300 dark:to-zinc-700 origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <ol className="space-y-10">
        {milestones.map((milestone, index) => (
          <motion.li
            key={index}
            className="relative pl-14"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={clsx(
              'absolute left-0 top-0.5 flex h-10 w-10 items-center justify-center rounded-full text-lg ring-4 ring-white dark:ring-zinc-900',
              milestone.current
                ? 'bg-emerald-500/10 ring-emerald-500/20'
                : 'bg-zinc-100 dark:bg-zinc-800'
            )}>
              <span>{milestone.icon}</span>
            </div>
            <div>
              <span className={clsx(
                'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold',
                milestone.current
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
              )}>
                {milestone.year}
                {milestone.current && ' \u2014 Present'}
              </span>
              <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {milestone.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {milestone.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

export default function About(){
    return(
        <>
            <Head>
                <title>
                    About - Manish Kumar
                </title>
                <meta
                    name="description"
                    content="I\u2019m Manish Kumar, a Software Developer Engineer II at Nike. I build resilient, high-scale web platforms."
                />
            </Head>

            {/* Hero section */}
            <Container className="mt-16 sm:mt-32">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                    <div className="lg:pl-20">
                        <div className="max-w-xs px-2.5 lg:max-w-none">
                            <Image
                                src={smokeImage}
                                alt=""
                                sizes="(min-width: 1024px) 32rem, 20rem"
                                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800 transition-transform transform hover:scale-x-110 hover:scale-y-110 hover:rotate-0"
                            />
                        </div>
                    </div>
                    <div className="lg:order-first lg:row-span-2">
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                            I&apos;m Manish, and I build stuff for the web.
                        </h1>
                        <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                            <p>
                                I&apos;m a Software Developer Engineer II at Nike, where I&apos;m
                                modernizing Nike&apos;s legacy event platform by building a secure,
                                vendor-agnostic middleware layer. I engineer JWT-based
                                authentication for token isolation between Nike and Eventtia
                                systems, enabling seamless event registration for millions of
                                users through resilient, low-latency APIs.
                            </p>
                            <p>
                                Before Nike, I spent over three years at Samsung India (Bangalore)
                                &mdash;first as a Senior Software Engineer, then promoted to
                                Associate Staff Engineer&mdash;leading R&amp;D initiatives across
                                C++, Java, and Python. I also freelanced as a web developer for
                                Zen Construction on the side.
                            </p>
                            <p>
                                I&apos;m originally from Asansol, a small town in West Bengal. I
                                studied Information Technology at Jadavpur University in Kolkata
                                and have been based in Bangalore since 2021. Today my daily
                                toolkit revolves around Java, Spring Boot, React, Next.js, and
                                cloud-native infrastructure.
                            </p>
                            <p>
                                I care deeply about accessibility, maintainability, and product
                                design&mdash;I try to build enjoyable products for everyone
                                involved.
                            </p>
                        </div>
                    </div>
                    <div className="lg:pl-20">
                        <ul>
                            <SocialLink href="https://twitter.com/LostBagpacker05" icon={TwitterIcon}>
                                Follow on Twitter
                            </SocialLink>
                            <SocialLink href="https://github.com/manu05X" icon={GitHubIcon} className="mt-4">
                                Follow on GitHub
                            </SocialLink>
                            <SocialLink href="https://www.linkedin.com/in/manishkumar005/" icon={LinkedInIcon} className="mt-4">
                                Follow on LinkedIn
                            </SocialLink>
                            <SocialLink href="https://medium.com/@k.manu00005" icon={MediumIcon} className="mt-4">
                                Follow on Medium
                            </SocialLink>
                            <SocialLink
                                href="mailto:k.manu00005@gmail.com"
                                icon={MailIcon}
                                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                            >
                                k.manu00005@gmail.com
                            </SocialLink>
                        </ul>
                    </div>
                </div>
            </Container>

            {/* Currently section */}
            <Container className="mt-24 sm:mt-32">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                            Currently
                        </h2>
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <span className="live-dot" />
                            Now
                        </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">What I&apos;m up to right now.</p>
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {currently.map((item) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-700/40 dark:bg-zinc-800/30"
                            >
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                        {item.label}
                                    </p>
                                    <p className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-300">
                                        {item.value}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Timeline section */}
            <Container className="mt-24 sm:mt-32">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                        My Journey
                    </h2>
                    <AnimatedTimeline />
                </div>
            </Container>

            {/* Fun facts bento grid */}
            <Container className="mt-24 sm:mt-32 mb-16">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                        Beyond the Code
                    </h2>
                    <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                        A few things that make me, me.
                    </p>
                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {bentoFacts.map((fact, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                className={clsx(
                                    'group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-700/40 dark:bg-zinc-800/40',
                                    fact.span
                                )}
                            >
                                {/* Background gradient accent */}
                                <div className={clsx(
                                    'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                                    fact.accent
                                )} />
                                <span className="relative z-10 text-3xl">{fact.icon}</span>
                                <h3 className="relative z-10 mt-3 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                                    {fact.title}
                                </h3>
                                <p className="relative z-10 mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    {fact.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}
