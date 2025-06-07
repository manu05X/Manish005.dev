import Image from 'next/image'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import samsung from '@/images/Entrance.jpg'
import GirlBoy from '@/images/GirlBoy.jpg'
import temple from '@/images/Temple.jpg'
import road from '@/images/Road.jpg'
import groot from '@/images/photos/Groot.jpg'

export function Photos() {
  let rotations = ['rotate-3', '-rotate-3', 'rotate-3', '-rotate-3', 'rotate-3']
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <div className="mt-16 sm:mt-20">
      <motion.div 
        className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {[samsung, GirlBoy, temple, road, groot].map((image, imageIndex) => (
          <motion.div
            key={image.src}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1,
              rotate: 0,
              transition: { type: "spring", stiffness: 300 }
            }}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 