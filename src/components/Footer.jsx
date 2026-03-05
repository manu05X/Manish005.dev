import Link from 'next/link'
import { useRef } from 'react'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  GitHubIcon,
  LinkedInIcon,
  MediumIcon,
  InstagramIcon,
} from '@/components/SocialIcons'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

function SocialIconLink({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="h-5 w-5 fill-zinc-400 transition group-hover:fill-teal-500 dark:fill-zinc-500 dark:group-hover:fill-teal-400" />
    </Link>
  )
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function MagneticWrap({ children }) {
  const ref = useRef(null)

  function handleMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-200"
    >
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col gap-8">
              {/* Tagline */}
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                Building resilient platforms &amp; crafting delightful experiences, one commit at a time.
              </p>

              {/* Nav links */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/resume">Resume</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/photography">Photography</NavLink>
                <NavLink href="/articles">Blogs</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>

              {/* Social icons */}
              <div className="flex justify-center gap-5">
                <SocialIconLink href="https://github.com/manu05X" icon={GitHubIcon} label="GitHub" />
                <SocialIconLink href="https://www.linkedin.com/in/manishkumar005/" icon={LinkedInIcon} label="LinkedIn" />
                <SocialIconLink href="https://twitter.com/LostBagpacker05" icon={TwitterIcon} label="Twitter" />
                <SocialIconLink href="https://www.instagram.com/_manu__005/" icon={InstagramIcon} label="Instagram" />
                <SocialIconLink href="https://medium.com/@k.manu00005" icon={MediumIcon} label="Medium" />
              </div>

              {/* Copyright + Built with badge + Back to top */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  &copy; {new Date().getFullYear()} Manish Kumar. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    Built with
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Next.js</span>
                    &amp;
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Tailwind CSS</span>
                  </span>
                  <MagneticWrap>
                    <button
                      onClick={scrollToTop}
                      aria-label="Back to top"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-teal-300 hover:text-teal-500 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-teal-600 dark:hover:text-teal-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </MagneticWrap>
                </div>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
