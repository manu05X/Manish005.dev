import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

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
          className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
        >
          <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
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

const funFacts = [
  { icon: '\u{1F3A8}', text: 'I sketch in my free time \u2014 the picture on this page is one of mine' },
  { icon: '\u{1F30D}', text: 'I love traveling and have bounced between Asansol, Kolkata, and Bangalore' },
  { icon: '\u2615',    text: 'Fueled by chai and late-night debugging sessions' },
  { icon: '\u{1F4DD}', text: 'I write about software engineering on Medium' },
  { icon: '\u{1F3B5}', text: 'Lo-fi beats are my coding soundtrack' },
  { icon: '\u{1F331}', text: 'Open source contributor and lifelong learner' },
]

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

            {/* Timeline section */}
            <Container className="mt-24 sm:mt-32">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                        My Journey
                    </h2>
                    <div className="mt-10 relative">
                        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-700" />
                        <ol className="space-y-10">
                            {milestones.map((milestone, index) => (
                                <li key={index} className="relative pl-14">
                                    <div className={clsx(
                                        'absolute left-0 top-0.5 flex h-10 w-10 items-center justify-center rounded-full text-lg ring-4 ring-white dark:ring-zinc-900',
                                        milestone.current
                                            ? 'bg-teal-500/10 ring-teal-500/20'
                                            : 'bg-zinc-100 dark:bg-zinc-800'
                                    )}>
                                        <span>{milestone.icon}</span>
                                    </div>
                                    <div>
                                        <span className={clsx(
                                            'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold',
                                            milestone.current
                                                ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
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
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </Container>

            {/* Fun facts section */}
            <Container className="mt-24 sm:mt-32 mb-16">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                        Beyond the Code
                    </h2>
                    <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                        A few things that make me, me.
                    </p>
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {funFacts.map((fact, index) => (
                            <div
                                key={index}
                                className="group flex items-start gap-4 rounded-xl border border-zinc-100 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md hover:shadow-teal-500/5 dark:border-zinc-700/40 dark:hover:border-teal-600 dark:hover:shadow-teal-400/5"
                            >
                                <span className="mt-0.5 text-2xl transition-transform duration-200 group-hover:scale-110">
                                    {fact.icon}
                                </span>
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {fact.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}
