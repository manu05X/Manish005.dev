import { formatDate } from '@/lib/formatDate'

function MediumIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

function ArticleCard({ article }) {
  const isMedium = article.source === 'medium'
  const href = isMedium ? article.link : `/articles/${article.slug}`
  const linkProps = isMedium
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      href={href}
      {...linkProps}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition-all duration-300 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-200/50 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:shadow-zinc-900/50"
    >
      {article.thumbnail && (
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={article.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {isMedium && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
              <MediumIcon className="h-3 w-3 fill-current" />
              Medium
            </span>
          )}
        </div>

        <h3 className="mt-3 text-base font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-teal-500 dark:text-zinc-100 dark:group-hover:text-teal-400 sm:text-lg">
          {article.title}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {article.description}
        </p>

        {article.categories && article.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.categories.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-700/50 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-teal-500">
          {isMedium ? 'Read on Medium' : 'Read article'}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4 stroke-current transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path
              d="M6.75 5.75 9.25 8l-2.5 2.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  )
}

export function Articles({ articles }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  )
}
