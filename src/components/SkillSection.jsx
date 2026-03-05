import { useId } from 'react'

export function SkillSection({ title, children }) {
  let id = useId()

  return (
    <section
      aria-labelledby={id}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2
        id={id}
        className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6 flex-none stroke-zinc-500">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="ml-3">{title}</span>
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
