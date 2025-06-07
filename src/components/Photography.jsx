import Image from 'next/image'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function Photo({ photo }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="group relative aspect-[3/2] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          className="object-cover transition duration-300 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <p className="text-lg font-medium text-white">{photo.title}</p>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/80" />
        <div className="relative z-50 max-w-4xl">
          <button
            className="absolute -right-4 -top-4 rounded-full bg-white p-2 text-zinc-800 hover:bg-zinc-100"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            <Image
              src={photo.src}
              alt={photo.alt}
              className="object-contain"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-medium text-white">{photo.title}</h3>
            {photo.description && (
              <p className="mt-2 text-zinc-300">{photo.description}</p>
            )}
            {photo.location && (
              <p className="mt-1 text-sm text-zinc-400">{photo.location}</p>
            )}
          </div>
        </div>
      </Dialog>
    </>
  )
}

export function Photography({ photos }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <Photo key={photo.src} photo={photo} />
      ))}
    </div>
  )
} 