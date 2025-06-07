import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useState } from 'react'

import { BriefcaseIcon } from '@/components/Icons'
import { Button } from '@/components/Button'
import { ArrowDownIcon } from '@/components/SocialIcons'
import { saveAs } from 'file-saver'

import logoSamsung from '@/images/logos/samsung.gif'
import logoNike from '@/images/nikelogo.jpg'
import logoFalco from '@/images/projects/falco.svg'
import logoJU from '@/images/logos/Ju_logo.png'

function Role({ role }) {
  let startLabel = typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end?.label ?? 'Present'
  let endDate = typeof role.end === 'string' ? role.end : role.end?.dateTime ?? new Date().getFullYear()

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        {role.roles ? (
          role.roles.map((subRole, index) => (
            <div key={index} className="mt-1">
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
          <>
            <dt className="sr-only">Role</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
              {role.title}
            </dd>
            <dt className="sr-only">Date</dt>
            <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
              <time dateTime={startDate}>{startLabel}</time>{' '}
              <span aria-hidden="true">—</span>{' '}
              <time dateTime={endDate}>{endLabel}</time>
            </dd>
          </>
        )}
      </dl>
    </li>
  )
}

export function Resume() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [resume] = useState([
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
  ])

  const handleDownloadCV = () => {
    const pdfPath = '/resources/ManishCV.pdf';
    saveAs(pdfPath, 'ManishResume.pdf');
    window.open(pdfPath, '_blank');
  };

  const visibleResume = isExpanded ? resume : resume.slice(0, 1)

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {visibleResume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      {resume.length > 1 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm font-medium text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
        >
          {isExpanded ? 'Show Less' : `Show ${resume.length - 1} More`}
        </button>
      )}
      <Button onClick={handleDownloadCV} variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

export default Resume 