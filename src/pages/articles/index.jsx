import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { Articles } from '@/components/Articles'

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Manish Kumar</title>
        <meta
          name="description"
          content="Articles about software development, programming, and technology."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <Articles articles={articles} />
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
