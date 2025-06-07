import Head from 'next/head'
import Image from 'next/image'
import clsx from 'clsx'
<<<<<<< HEAD
=======
import { motion } from 'framer-motion'
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import { saveAs } from 'file-saver';
import React, { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
=======
import { ToolsSection } from '@/components/home/ToolsSection'
import { Photos } from '@/components/home/Photos'
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)

import {
    MediumIcon,
    GitHubIcon,
    LinkedInIcon,
    TwitterIcon,
    InstagramIcon,
    BriefcaseIcon,
    SocialLink,
    ArrowDownIcon,
    MailIcon,
  } from '@/components/SocialIcons'

import logoFalco from '@/images/projects/falco.svg'
import logoSamsung from '@/images/logos/samsung.gif'
<<<<<<< HEAD
=======
import logoNike from '@/images/nikelogo.jpg'
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
import logoJU from '@/images/logos/Ju_logo.png'
import road from '@/images/Road.jpg'
import GirlBoy from '@/images/GirlBoy.jpg'
import groot from '@/images/photos/Groot.jpg'
import temple from '@/images/Temple.jpg'
import samsung from '@/images/Entrance.jpg'
import { SkillSection } from '@/components/SkillSection'
import SkillCategory from '@/components/SkillCategory'

<<<<<<< HEAD

function ToolsSection({children, ...props }) {
  return (
    <SkillSection {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </SkillSection>
  )
}

=======
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
// Main Page article section
function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

//Resume Section
function Resume() {
    const handleDownloadCV = () => {
      const pdfPath = '/resources/ManishCV.pdf';
      saveAs(pdfPath, 'ManishResume.pdf');
      window.open(pdfPath, '_blank');
    };
  
    let resume = [
      {
<<<<<<< HEAD
        company: 'Samsung India  -  Banglore',
        title: 'Senior Software Engineer',
        logo: logoSamsung,
        start: 'July 2021',
=======
        company: 'Nike - Bangalore',
        title: 'Software Developer Engineer II',
        logo: logoNike,
        start: 'Jan 2025',
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
        end: {
          label: 'Present',
          dateTime: new Date().getFullYear(),
        },
      },
<<<<<<< HEAD
=======

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
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
      {
        company: 'Zen Construction  -  Banglore',
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
              <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
              </div>
              <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {role.company}
                </dd>
<<<<<<< HEAD
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                  {role.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={`${role.start.label ?? role.start} until ${role.end.label ?? role.end
                    }`}
                >
                  <time dateTime={role.start.dateTime ?? role.start}>
                    {role.start.label ?? role.start}
                  </time>{' '}
                  <span aria-hidden="true">—</span>{' '}
                  <time dateTime={role.end.dateTime ?? role.end}>
                    {role.end.label ?? role.end}
                  </time>
                </dd>
=======
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
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
              </dl>
            </li>
          ))}
        </ol>
        <Button onClick={handleDownloadCV} variant="secondary" className="group mt-6 w-full">
          Download CV
          <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Button>
      </div>
    )
  }

<<<<<<< HEAD
//Photos section of main page

  function Photos() {
    let rotations = ['rotate-3', '-rotate-3', 'rotate-3', '-rotate-3', 'rotate-3']
  
    return (
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {[samsung, GirlBoy, temple, road, groot].map((image, imageIndex) => (
            <div
              key={image.src}
              className={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                rotations[imageIndex % rotations.length],
                'transition-transform transform hover:scale-110 hover:rotate-0',
                'sm:hover:scale-110',
                'mobile-move'
              )}
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }


/*
function Photos() {
  const rotations = ['rotate-3', '-rotate-3', 'rotate-3', '-rotate-3', 'rotate-3'];
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Adjust the multiplier for sensitivity
    setScrollLeft(scrollLeft - walk);
    containerRef.current.scrollLeft = scrollLeft;

    // Infinite scroll logic
    const containerWidth = containerRef.current.offsetWidth;
    if (scrollLeft <= 0) {
      setScrollLeft(scrollLeft + containerWidth);
    } else if (scrollLeft >= containerWidth * 2) {
      setScrollLeft(scrollLeft - containerWidth);
    }
  };

  return (
    <div
      className="mt-16 sm:mt-20 overflow-x-scroll"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="-my-4 flex justify-center gap-5 py-4 sm:gap-8">
        {[samsung, GirlBoy, temple, road, groot].map((image, imageIndex) => (
          <div
            key={image.src + imageIndex}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length],
              'transition-transform transform hover:scale-110 hover:rotate-0',
              'sm:hover:scale-110',
              'mobile-move'
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
*/


  // This is the home section 
export default function Home({ articles }) {
  // console.log(articles)

=======
// This is the home section 
export default function Home({ articles }) {
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
  return (
    <>
      <Head>
        <title>
          Manish Kumar - Software Engineer, Open Source, Travel
        </title>
        <meta
          name="description"
<<<<<<< HEAD
          content="I am Manish, a Senior Software Enginner currently at Samsung. I sometimes occasionally build the odd open-source project."
        />
      </Head>
      <Container className="mt-9">
        <div className="grid md:grid-cols-2 gap-4">
=======
          content="I'm Manish, a Senior Software Engineer currently at Samsung(SSIR). I completed my bachelor of engineering from Jadavpur University(Kolkata) in Information Technology."
        />
      </Head>
      <Container className="mt-9">
        <div className="grid md:grid-cols-1 gap-4">
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
          <div className="col-span-1">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Nice to meet you.
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
<<<<<<< HEAD
              I’m Manish, a Senior Software Engineer currently at Samsung(SSIR). I completed my bachelor of engineering from Jadavpur University(Kolkata) in Information Technology. 
              Working on the web is my passion as I love to work on exciting projects. This is the field I get to express my creativity.
            </p>
          </div>
          <div className="md:ml-auto max-w-xs col-span-1 flex flex-col items-end"> {/* Updated to flex and items-end */}
            <Resume />
          </div>
          <div className="mt-4 flex gap-6">
=======
              I'm Manish, a Software Developer Engineer II at Nike, where I'm currently modernizing Nike's legacy event platform by developing a secure, vendor-agnostic middleware layer. My work includes engineering JWT-based authentication to ensure token isolation between Nike and Eventtia systems, enabling seamless event registration for millions of users through resilient, low-latency APIs.
            </p>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
              Previously, I worked at Samsung India as a Senior Software Engineer, where I completed my bachelor of engineering from Jadavpur University(Kolkata) in Information Technology. Working on the web is my passion as I love to work on exciting projects. This is the field I get to express my creativity.
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-6">
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
            <SocialLink
              href="https://twitter.com/LostBagpacker05"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://github.com/manu05X"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            
            <SocialLink
              href="https://www.linkedin.com/in/manishkumar005/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="https://www.instagram.com/backpacker_lost/"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://medium.com/@k.manu00005"
              aria-label="Follow on Twitter"
              icon={MediumIcon}
            /> 
          </div>
<<<<<<< HEAD
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article,index) => (
              <Article key={index} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
              <ToolsSection title='Skills'>
                <SkillCategory title="Programing Languages" skills={['Java', 'JavaScript', 'C++', 'Python', 'C#']}/>
                <SkillCategory title="Web Development" skills={['React.Js', 'Next.Js','Astro','Node.Js', 'Mongo DB', 'MVC', 'REST','HTML5','ES6']}/>
                <SkillCategory title="Software & Applications" skills={['Github', 'Figma', 'Jira', 'Canva','PowerPoint', 'Gradle', 'Mokito','Chat-Gpt', 'Bard']}/>
                <SkillCategory title="Tools" skills={['VSCode', 'IntelliJ', 'Linux', 'Windows 11','Chrome','Sublime Text', 'MS-Edge','MS-VisualStudio']}/>
              </ToolsSection>
=======
      </Container>

      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="md:ml-auto max-w-lg col-span-1 flex flex-col">
            <Resume />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ToolsSection title="Skills">
              <SkillCategory 
                title="Programming Languages" 
                skills={[
                  'Java', 
                  'JavaScript', 
                  'TypeScript',
                  'Python', 
                  'C++', 
                  'Golang'
                ]} 
              />
              <SkillCategory 
                title="Web Technologies" 
                skills={[
                  'Spring Boot',
                  'React.js',
                  'Next.js',
                  'Node.js',
                  'Express.js',
                  'REST APIs',
                  'GraphQL',
                  'MongoDB',
                  'MySQL',
                  'PostgreSQL',
                  'Redis',
                  'AWS',
                  'Docker',
                  'Kubernetes'
                ]} 
              />
             
              <SkillCategory 
                title="Tools & Practices" 
                skills={[
                  'Git & GitHub',
                  'GitHub Copilot',
                  'Jira',
                  'Agile/Scrum',
                  'CI/CD',
                  'Microservices',
                  'System Design'
                ]} 
              />
            </ToolsSection>
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
          </div>
        </div>
      </Container>
    </>
  )
}

<<<<<<< HEAD

export async function getStaticProps() {
  // if (process.env.NODE_ENV === 'production') {
  //   await generateRssFeed()
  // }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
=======
export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
    },
  }
}