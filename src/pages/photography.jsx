import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import fs from 'fs'
import path from 'path'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

function PhotoCard({ photo, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Different parallax speeds for different positions
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 100 : -100, 0]
  )

  return (
    <>
      <motion.div
        ref={ref}
        style={{ y }}
        className="w-full"
      >
        <CardContainer className="w-full">
          <CardBody 
            className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.15] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 border transition-all duration-300 hover:border-emerald-500/20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardItem translateZ="150" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg"
                style={{
                  height: isHovered ? '400px' : '300px',
                  width: '100%',
                  transition: 'all 0.3s ease-in-out',
                  transform: isHovered ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </CardItem>
            <CardItem
              translateZ="200"
              className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300"
              style={{
                transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)',
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <motion.h3 
                className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white group-hover/card:text-emerald-500 transition-colors duration-300"
                animate={{ 
                  y: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0.8,
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {photo.title}
              </motion.h3>
              <motion.p 
                className="mt-3 text-lg text-gray-500 dark:text-gray-400 group-hover/card:text-gray-600 dark:group-hover/card:text-gray-300 transition-colors duration-300"
                animate={{ 
                  y: isHovered ? 0 : 5,
                  opacity: isHovered ? 1 : 0.8,
                  scale: isHovered ? 1.02 : 1
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {photo.description}
              </motion.p>
              <motion.p 
                className="mt-3 text-base text-gray-400 dark:text-gray-500 group-hover/card:text-emerald-500/80 transition-colors duration-300"
                animate={{ 
                  y: isHovered ? 0 : 5,
                  opacity: isHovered ? 1 : 0.8,
                  scale: isHovered ? 1.02 : 1
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {photo.location}
              </motion.p>
            </CardItem>
          </CardBody>
        </CardContainer>
      </motion.div>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-[90vw] max-w-6xl aspect-[4/3] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              {/* Border container with subtle glow */}
              <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]" />
              
              {/* Image */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
              
              {/* Subtle inner border */}
              <div className="absolute inset-0 rounded-xl border border-emerald-500/20 pointer-events-none" />
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300 hover:scale-110 border border-emerald-500/30 hover:border-emerald-500/50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default function Photography({ photos }) {
  return (
    <>
      <Head>
        <title>Photography - Manish Kumar</title>
        <meta
          name="description"
          content="A collection of my photography work, capturing moments and landscapes."
        />
      </Head>
      <SimpleLayout
        title="Capturing moments through my lens."
        intro="I love photography as a way to capture and share the beauty I see in the world. Here's a collection of my favorite shots."
      >
        <Container className="mt-16 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-12 sm:gap-16 lg:gap-20 sm:grid-cols-2"
          >
            {photos.map((photo, photoIndex) => (
              <PhotoCard key={photoIndex} photo={photo} index={photoIndex} />
            ))}
          </motion.div>
        </Container>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const photosDirectory = path.join(process.cwd(), 'public/photography')
  const filenames = fs.readdirSync(photosDirectory)

  const photos = filenames
    .filter(filename => {
      const ext = path.extname(filename).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext)
    })
    .map(filename => {
      // Remove file extension and convert to title case
      const title = filename
        .replace(/\.[^/.]+$/, '') // Remove extension
        .split(/[-_]/) // Split by hyphen or underscore
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

      return {
        src: `/photography/${filename}`,
        alt: title,
        title: title,
        description: '', // You can add descriptions in a separate JSON file if needed
        location: '', // You can add locations in a separate JSON file if needed
      }
    })

  return {
    props: {
      photos,
    },
  }
}