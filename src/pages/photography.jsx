import Head from 'next/head'
import { useState, useCallback, useEffect } from 'react'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const photo = photos[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Previous photo"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Next photo"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <motion.div
        key={currentIndex}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={1200}
          height={800}
          className="max-h-[85vh] w-auto rounded-lg object-contain"
          sizes="90vw"
          priority
        />
        {photo.title && (
          <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/60 to-transparent px-6 pb-4 pt-12">
            <p className="text-lg font-medium text-white">{photo.title}</p>
            {photo.location && (
              <p className="mt-1 text-sm text-white/70">{photo.location}</p>
            )}
          </div>
        )}
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
        {currentIndex + 1} / {photos.length}
      </div>
    </motion.div>
  )
}

function PhotoCard({ photo, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={600}
          height={400}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-4 px-4 pb-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm font-medium text-white">{photo.title}</p>
          {photo.location && (
            <p className="mt-0.5 text-xs text-white/70">{photo.location}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Photography({ photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i === 0 ? photos.length - 1 : i - 1))
  }, [photos.length])
  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i === photos.length - 1 ? 0 : i + 1))
  }, [photos.length])

  return (
    <>
      <Head>
        <title>Photography - Manish Kumar</title>
        <meta
          name="description"
          content="A collection of my photography — capturing moments, landscapes, and the beauty in everyday life."
        />
      </Head>
      <SimpleLayout
        title="Capturing moments through my lens."
        intro="Photography is how I slow down and notice the world. Here are some of my favorite shots from travels and everyday life."
      >
        <div className="mt-16 sm:mt-20">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((photo, index) => (
              <div key={photo.src} className="mb-4 break-inside-avoid">
                <PhotoCard
                  photo={photo}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </SimpleLayout>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export async function getStaticProps() {
  const photosDirectory = path.join(process.cwd(), 'public/photography')
  const filenames = fs.readdirSync(photosDirectory)

  const photos = filenames
    .filter((filename) => {
      const ext = path.extname(filename).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext)
    })
    .map((filename) => {
      const title = filename
        .replace(/\.[^/.]+$/, '')
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

      return {
        src: `/photography/${filename}`,
        alt: title,
        title,
        location: '',
      }
    })

  return {
    props: { photos },
  }
}
