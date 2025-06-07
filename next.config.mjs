import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

<<<<<<< HEAD

=======
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
<<<<<<< HEAD
  experimental: {
    scrollRestoration: true,
=======
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)

