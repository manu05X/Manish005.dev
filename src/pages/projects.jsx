import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { SimpleLayout } from "@/components/SimpleLayout";

import imdb from "@/images/logos/imdb.svg";
import logoMeetup from "@/images/projects/meetup.png";
import Netflix from "@/images/projects/Netflix.jpg";
import logoFalco from "@/images/projects/falco.svg";
import logoTheatresParisiens from "@/images/projects/theatres-parisiens.svg";
import logoSplitwise from "@/images/logos/bg-splitwise.svg";
import logoBMS from "@/images/logos/bms.svg";

const projects = [
  {
    name: "IMDB Clone",
    description: "Using TMDB api and React I created a full-featured clone of IMDB with search, ratings, and movie details.",
    link: { href: "https://imdb-clone-manu005.netlify.app/", label: "MovieIMDB.in" },
    logo: imdb,
    tags: ["React", "TMDB API"],
  },
  {
    name: "URL Shortener Service",
    description: "Server capable of generating, tracking and managing shortened URLs with analytics and custom aliases.",
    link: { href: "https://github.com/manu05X/UrlShortning", label: "github.com" },
    logo: logoTheatresParisiens,
    tags: ["Java", "Spring Boot"],
  },
  {
    name: "Splitwise-LLD",
    description: "Expense Sharing Application backend APIs using Java Spring Boot with MySQL and MVC architecture.",
    link: { href: "https://github.com/manu05X/Splitwise-LLD", label: "github.com" },
    logo: logoSplitwise,
    tags: ["Java", "MySQL"],
  },
  {
    name: "BookMyShow-FullStack",
    description: "Server-rendered BookMyShow website built using Node.js, React.js, Express.js and MongoDB.",
    link: { href: "https://github.com/manu05X/Recommendation-System", label: "github.com" },
    logo: logoBMS,
    tags: ["Node.js", "React", "MongoDB"],
  },
  {
    name: "ZEN Construction",
    description: "Modern Civil Engineering and Construction Solutions — full website with CMS integration.",
    link: { href: "https://zenconstruction.in/", label: "zenconstruction.in" },
    logo: logoFalco,
    tags: ["Next.js", "Tailwind"],
  },
  {
    name: "GiftKart",
    description: "Server-rendered e-commerce website built using Express.js and MongoDB with cart and checkout flow.",
    link: { href: "https://github.com/manu05X/GiftKart", label: "github.com" },
    logo: logoMeetup,
    tags: ["Express.js", "MongoDB"],
  },
  {
    name: "Netflix Recommendation",
    description: "Recommends series/movies based on user taste — ML-powered similarity engine with React frontend.",
    link: { href: "https://github.com/manu05X/Recommendation-System", label: "github.com" },
    logo: Netflix,
    tags: ["Python", "React"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
  }

  function handleMouseLeave() {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }

  return (
    <motion.li
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group relative flex flex-col rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-zinc-700/40 dark:bg-zinc-800/40 dark:backdrop-blur-sm dark:hover:border-violet-500/30 dark:hover:shadow-violet-500/5"
      style={{ transformStyle: "preserve-3d", transition: "transform 200ms ease, box-shadow 300ms ease" }}
    >
      {/* Gradient border overlay on hover (dark mode) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-0 dark:group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, rgba(110,231,183,0.08), rgba(129,140,248,0.08))",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-700/50 dark:ring-white/10">
        <Image src={project.logo} alt="" className="h-8 w-8 object-contain" unoptimized />
      </div>

      {/* Title */}
      <h2 className="relative z-10 mt-5 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        {project.name}
      </h2>

      {/* Description */}
      <p className="relative z-10 mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      {/* Tags */}
      <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-700/60 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer link */}
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-700/40">
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition group-hover:text-emerald-500 dark:text-zinc-500 dark:group-hover:text-emerald-400"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          {project.link.label}
        </a>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-500 opacity-0 transition-all duration-200 group-hover:opacity-100 dark:text-emerald-400">
          View project
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 stroke-current transition-transform group-hover:translate-x-0.5">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </motion.li>
  );
}

export default function Project() {
  return (
    <>
      <Head>
        <title>Projects — Manish Kumar</title>
        <meta name="description" content="Things I've made trying to put my dent in the software and computing universe." />
      </Head>
      <SimpleLayout
        title="Some of my stuff I made"
        intro="Here's a collection of side projects I've enjoyed working on over the years."
      >
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
}
