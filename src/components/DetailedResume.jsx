import { Button } from '@/components/Button'
import { ArrowDownIcon, BriefcaseIcon } from '@/components/SocialIcons'

function SectionTitle({ children }) {
  return (
    <h3 className="mb-4 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:border-zinc-700 dark:text-zinc-100">
      {children}
    </h3>
  )
}

function ExperienceBlock({ company, location, roles }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{company}</span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{location}</span>
      </div>
      {roles.map((role, i) => (
        <div key={i} className="mt-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <span className="text-xs font-medium italic text-zinc-700 dark:text-zinc-300">{role.title}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{role.dates}</span>
          </div>
          {role.stack && (
            <p className="mt-1 text-[11px] italic text-zinc-500 dark:text-zinc-400">
              <span className="not-italic font-semibold text-zinc-600 dark:text-zinc-300">Stack: </span>
              {role.stack}
            </p>
          )}
          <ul className="mt-1.5 space-y-1 pl-4">
            {role.bullets.map((bullet, j) => (
              <li
                key={j}
                className="list-disc text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
                dangerouslySetInnerHTML={{ __html: bullet }}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ProjectBlock({ name, link, stack, bullets }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{name}</span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-teal-500 hover:text-teal-600"
          >
            GitHub
          </a>
        )}
      </div>
      {stack && (
        <p className="mt-1 text-[11px] italic text-zinc-500 dark:text-zinc-400">
          <span className="not-italic font-semibold text-zinc-600 dark:text-zinc-300">Stack: </span>
          {stack}
        </p>
      )}
      <ul className="mt-1.5 space-y-1 pl-4">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="list-disc text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
            dangerouslySetInnerHTML={{ __html: bullet }}
          />
        ))}
      </ul>
    </div>
  )
}

const experience = [
  {
    company: 'Nike, Inc. — Community Experience Platform (CXP)',
    location: 'Bengaluru, India',
    roles: [
      {
        title: 'Software Development Engineer II (Full-Stack)',
        dates: 'Jan 2025 – Present',
        stack: 'Java 17, Spring WebFlux, Redis, DynamoDB, AWS ECS Fargate, Terraform, Jenkins, Akamai, SignalFx, Splunk, Docker',
        bullets: [
          '<strong>Bot Protection & Cost Optimization:</strong> Engineered multi-layered bot protection using Redis caching, rate limiting, and idempotency keys in Spring WebFlux, reducing WAF infrastructure by 40% (<strong>$144K annual savings</strong>), slashing API traffic by 70%, and improving response times by 75% (320ms → 80ms) for Nike\'s event platform serving 25M+ monthly users.',
          '<strong>Fault-Tolerant Registration:</strong> Designed DynamoDB-based queue with asynchronous processing to handle third-party API failures, achieving <strong>100% registration recovery</strong> during outages with conditional writes, duplicate prevention, and exponential backoff retry.',
          '<strong>Intelligent Error Code Mapping:</strong> Built error code determination system translating unstructured third-party API errors into 5 structured error codes, <strong>reducing support tickets by 40%</strong> and enabling localized user messages across US/EU regions.',
          '<strong>Multi-Layer Caching:</strong> Architected three-tier caching — Akamai CDN (edge), Redis ElastiCache (PairwiseId 30-day TTL, attendee status 60s), and in-memory (translations, feature flags) — achieving <strong>78% cache hit rate</strong> and enabling 3x peak load handling.',
          '<strong>Security & Multi-Region:</strong> Architected JWT-based shim layer reducing integration overhead by 60%; rolled out multi-region deployment (US/EU) via Terraform, S3, and Secrets Manager with automated secret rotation.',
          '<strong>Observability:</strong> Configured SignalFx sidecars with structured logging and ThreadContext propagation in reactive flows, increasing log accuracy by 60% and accelerating incident resolution by 25%.',
        ],
      },
    ],
  },
  {
    company: 'Samsung Semiconductor India Research',
    location: 'Bengaluru, India',
    roles: [
      {
        title: 'Associate Staff Engineer — Senior Software Engineer',
        dates: 'Jul 2021 – Oct 2024',
        stack: 'Java, Spring Boot, Spring Security, React.js, JavaScript, Docker, Grafana, Kafka, MySQL, Inno Setup',
        bullets: [
          'Architected in-house performance profiler and analysis tools using Java, Spring Boot, and React, eliminating external vendor dependency and achieving <strong>$70,000 annual cost savings</strong>.',
          'Containerized UI and API servers with Docker and docker-compose, establishing CI/CD pipelines that <strong>cut deployment time by 50%</strong> and reduced environment-specific bugs by 70%.',
          'Built authentication service using Spring Security with role-based access control; implemented React.js front-end delivering a seamless interface across 5 departments.',
          'Optimized telemetry data handling, boosting sequential read/write speeds by 8% and random read/write by 5%; increased unit test coverage from 36% to 60%.',
          'Led sprint planning, cross-team demos, and onboarding for 5+ junior developers, accelerating feature rollout by 20%.',
        ],
      },
    ],
  },
]

const projects = [
  {
    name: 'ShopStream — Full-Stack E-Commerce Platform',
    link: 'https://github.com/manu05X',
    stack: 'Java 17, Spring Boot, React.js, Redux, PostgreSQL, Redis, Stripe API, Docker, AWS S3, JWT, Kafka',
    bullets: [
      'Built a production-grade e-commerce platform with <strong>microservices architecture</strong> — Product Catalog, Cart, Order, Payment, and Notification services communicating via Kafka and REST APIs.',
      'Implemented <strong>Stripe payment integration</strong> with idempotent checkout, order state machine, and webhook-based payment confirmation ensuring zero duplicate charges.',
      'Designed <strong>Redis-backed cart & session management</strong> with TTL-based expiry, achieving sub-50ms response times, and PostgreSQL with optimistic locking to prevent overselling.',
      'Built responsive React storefront with Redux state management, JWT authentication with refresh token rotation, role-based access, and AWS S3 image uploads with CDN delivery.',
    ],
  },
]

const skills = [
  { category: 'Languages', items: 'Java 17, JavaScript, C++, Go' },
  { category: 'Frameworks', items: 'Spring Boot, Spring WebFlux, Project Reactor, React.js, Redux, Node.js, REST APIs, Microservices' },
  { category: 'Databases & Cache', items: 'DynamoDB, Redis (ElastiCache), MySQL, PostgreSQL, MongoDB, S3-backed TTL Cache' },
  { category: 'Cloud & DevOps', items: 'AWS (ECS Fargate, S3, Secrets Manager, CloudWatch, KMS), Docker, Terraform, Jenkins, Akamai CDN' },
  { category: 'Observability', items: 'Splunk, SignalFx (APM/Metrics/Traces), Grafana, Structured Logging, Distributed Tracing' },
  { category: 'Architecture', items: 'Reactive Programming, Event-Driven Design, JWT Auth, Rate Limiting, Circuit Breaker, Cache-Aside' },
]

const impactStats = [
  { value: '$144K', label: 'Annual Savings' },
  { value: '75%', label: 'Faster Response' },
  { value: '25M+', label: 'Monthly Users' },
  { value: '100%', label: 'Recovery Rate' },
]

export function DetailedResume() {
  const handleDownloadCV = () => {
    const a = document.createElement('a')
    a.href = '/resources/ManishCV.pdf'
    a.download = 'Manish-Kumar-Resume.pdf'
    a.click()
  }

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 dark:border-zinc-700/40 dark:bg-zinc-900/50 sm:p-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="flex items-center justify-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-5 w-5" />
          Resume
        </h2>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          SDE II &nbsp;|&nbsp; Full-Stack &nbsp;|&nbsp; 25M+ Users &nbsp;|&nbsp; Distributed Systems
        </p>
      </div>

      {/* Key Impact Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {impactStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-teal-500/5 px-3 py-2.5 text-center dark:bg-teal-500/10"
          >
            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">{stat.value}</div>
            <div className="text-[10px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Technical Skills */}
      <div className="mb-6">
        <SectionTitle>Technical Skills</SectionTitle>
        <div className="grid gap-1.5">
          {skills.map((skill) => (
            <div key={skill.category} className="grid grid-cols-[110px_1fr] gap-2 sm:grid-cols-[130px_1fr]">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{skill.category}</span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{skill.items}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <SectionTitle>Professional Experience</SectionTitle>
        {experience.map((exp) => (
          <ExperienceBlock key={exp.company} {...exp} />
        ))}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <SectionTitle>Projects</SectionTitle>
        {projects.map((proj) => (
          <ProjectBlock key={proj.name} {...proj} />
        ))}
      </div>

      {/* Education */}
      <div className="mb-6">
        <SectionTitle>Education</SectionTitle>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Jadavpur University — B.E. in Information Technology
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Jul 2017 – Apr 2021 | Kolkata</span>
        </div>
        <p className="mt-1 text-[11px] italic text-zinc-500 dark:text-zinc-400">
          Coursework: Data Structures & Algorithms, OOP, Databases & SQL, Operating Systems, Distributed Systems, Web Development, Computer Networks
        </p>
      </div>

      {/* Download Button */}
      <Button onClick={handleDownloadCV} variant="secondary" className="group w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}
