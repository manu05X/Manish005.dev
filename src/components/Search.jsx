import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function Search({ onSearch }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query, onSearch])

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-zinc-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="search"
        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-500 sm:text-sm sm:leading-6"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
} 