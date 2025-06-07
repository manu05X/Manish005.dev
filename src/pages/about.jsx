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

export default function About(){
    return(
        <>
            <Head>
                <title>
                    Manish Kumar - Software Engineer, Open Source, Travel
                </title>
                <meta 
                    name="description"
                    content="I am Manish, a Senior Software Enginner currently at Samsung. I love to devlop web-projects."
                />
            </Head>
            <Container className="mt-16 sm:mt-32">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                    <div className="lg:pl-20"> 
                        <div className="max-w-xs px-2.5 lg:max-w-none">
                            <Image
                                src={smokeImage}
                                alt=""
                                sizes="(min-width: 1024px) 32rem, 20rem"
                                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800  transition-transform transform hover:scale-x-110 hover:scale-y-110 hover:rotate-0"
                            />
                        </div>
                    </div>
                    <div className="lg:order-first lg:row-span-2">{/* (lg denotes large screens). It sets the number of rows the element should span in a grid */}
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                            I’m Manish , and I build stuff for the web.
                        </h1>
                        {/* <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400"> */}
                        <div className="mt-6 space-y-7 text-base  text-zinc-600 dark:text-zinc-400">
                        <p>
                            I’m Manish, a Senior Software Engineer. I’m Indian, originally
                            from Asansol (a small-ish town in West Bengal)—I bounced
                            back and forth between Kolkata, Banglore and the Asansol for a bit then
                            currentlly in Banglore about two years ago.
                        </p>
                        <p>
                            I’ve been working for Samsung India(Banglore) for about two years, in a variety of 
                            Software Development and Research. My main
                            language for the past two years has been C++, C# and Python for
                            which I have a deep appreciation.
                        </p>
                        <p>
                            I’m interested in building website, accessibility, maintainability,
                            product design, and the interplay between those. In other words,
                            I try to build enjoyable products—for all the parties involved.
                        </p>
                        <p>
                            The picture on this page was sketched by me. I like it.
                            {/* <a href="https://www.instagram.com/p/Cx59PcOBatr/?igsh=d2RnaTFrdmg1dXpl" class="text-teal-500 hover:underline">@backpacker_lost</a>. */}
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
                            >{/* border-t -> border line between mail and social icon*/}
                                k.manu00005@gmail.com
                            </SocialLink>
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    )
}
