import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
// import { getAllArticles } from '@/lib/getAllArticles'
import { getMediumArticles } from '@/lib/medium'
import { Articles } from '@/components/Articles'

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Manish Kumar</title>
        <meta
          name="description"
          content="Articles about software development, programming, and technology — from my blog and Medium."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, engineering, and technology."
        intro="All of my long-form thoughts on programming, system design, and more — collected from my blog and Medium, in chronological order."
      >
        <Articles articles={articles} />
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const mediumArticles = await getMediumArticles()

  const articles = mediumArticles.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return {
    props: { articles },
    revalidate: 3600,
  }
}
