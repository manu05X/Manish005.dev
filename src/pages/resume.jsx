import Head from 'next/head'
import { Container } from '@/components/Container'
import { DetailedResume } from '@/components/DetailedResume'

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume - Manish Kumar</title>
        <meta
          name="description"
          content="Resume of Manish Kumar — SDE II at Nike. Experience in distributed systems, full-stack development, and building platforms serving 25M+ users."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Resume
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            My professional journey, technical skills, and the impact I&apos;ve made building high-scale platforms.
          </p>
        </header>
        <div className="mt-16 sm:mt-20">
          <DetailedResume />
        </div>
      </Container>
    </>
  )
}
