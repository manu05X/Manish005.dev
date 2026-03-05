import Image from 'next/image'
import clsx from 'clsx'

import samsung from '@/images/Entrance.jpg'
import GirlBoy from '@/images/GirlBoy.jpg'
import temple from '@/images/Temple.jpg'
import road from '@/images/Road.jpg'
import groot from '@/images/photos/Groot.jpg'

const photos = [
  { src: samsung, alt: 'Samsung Office' },
  { src: GirlBoy, alt: 'Sketch' },
  { src: temple, alt: 'Temple' },
  { src: road, alt: 'Road Trip' },
  { src: groot, alt: 'Groot' },
]

function PhotoCard({ photo, rotation }) {
  return (
    <div
      className={clsx(
        'group relative flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl',
        'aspect-[9/10] w-44 sm:w-64',
        rotation
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 640px) 16rem, 11rem"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 sm:text-sm">
        {photo.alt}
      </span>
    </div>
  )
}

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', '-rotate-3', 'rotate-2']

export function Photos() {
  const doubled = [...photos, ...photos]

  return (
    <div className="mt-16 overflow-hidden sm:mt-20">
      <div className="marquee-track flex gap-5 py-4 sm:gap-8">
        {doubled.map((photo, i) => (
          <PhotoCard
            key={`${photo.alt}-${i}`}
            photo={photo}
            rotation={rotations[i % rotations.length]}
          />
        ))}
      </div>
    </div>
  )
}
