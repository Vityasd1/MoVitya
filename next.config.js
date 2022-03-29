/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com','image.tmdb.org','lh3.googleusercontent.com']
  },
  react: {
    useSuspense: false,
    wait: true
  }
}

module.exports = nextConfig
