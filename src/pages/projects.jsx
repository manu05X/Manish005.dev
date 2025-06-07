import Head from "next/head";
import Image from "next/image";
import { LinkIcon } from "@/components/SocialIcons";
import { SimpleLayout } from "@/components/SimpleLayout";
import { Card } from "@/components/Card";

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
    description: "Using TMDB api and react i created a clone of IMDB",
    link: {
      href: "https://imdb-clone-manu005.netlify.app/",
      label: "MovieIMDB.in",
    },
    logo: imdb,
  },
  {
    name: "URL Shortener Service",
    description:
      "Design a server capable of generating, tracking and managing shortened URLs with specific functionalities.",
    link: {
      href: "https://github.com/manu05X/UrlShortning",
      label: "github.com",
    },
    logo: logoTheatresParisiens,
  },
  {
    name: "Splitwise-LLD",
    description:
      "Create an Expense Sharing Application backend APIs using Java Spring Boot using MySql database having MVC architecture.",
    link: {
      href: "https://github.com/manu05X/Splitwise-LLD",
      label: "github.com",
    },
    logo: logoSplitwise,
  },
  {
    name: "BookMyShow-FullStack",
    description:
      "A web-app server-rendered BookMyShow website built using Node.js, React.js, Express.js and MongoDB and Moongoose",
    link: {
      href: "https://github.com/manu05X/Recommendation-System",
      label: "github.com",
    },
    logo: logoBMS,
  },
  {
    name: "ZEN Construction",
    description: "Modern Civil Engineering and Construction Solutions.",
    link: { href: "https://zenconstruction.in/", label: "zenconstruction.in" },
    logo: logoFalco,
  },
  {
    name: "GiftKart",
    description:
      "A server-rendered e-commerce website built using Express.js and MongoDB",
    link: { href: "https://github.com/manu05X/GiftKart", label: "github.com" },
    logo: logoMeetup,
  },
  {
    name: "Netflix-Recommendation-System",
    description:
      "A web-app which can be used to get recommendations for a series/movie, the app recommends a list of media according to list of entered choices.",
    link: {
      href: "https://github.com/manu05X/Recommendation-System",
      label: "github.com",
    },
    logo: Netflix,
  },

  // {
  //     name: '',
  //     description: '',
  //     link: {},
  //     logo: logoShowcaseForDiscogs,
  // },
];

export default function Project() {
  return (
    <>
      <Head>
        <title>Projects — Manish Kumar</title>
        <meta
          name="description"
          content="Things I’ve made trying to put my dent in the software and computing universe."
        />
      </Head>
      <SimpleLayout
        title="Some of my stuff I made"
        intro="Here’s a collection of side projects I’ve enjoyed working on over the years."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-8 w-8"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
}
