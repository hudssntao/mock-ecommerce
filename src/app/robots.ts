import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
      sitemap: process.env.NODE_ENV === 'production' 
        ? 'https://not-amazon.com/sitemap.xml' 
        : 'http://localhost:3000/sitemap.xml',
  }
}
