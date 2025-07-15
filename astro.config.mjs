// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Enable Tailwind CSS
  integrations: [tailwind()],

  // Output configuration for Cloudflare Pages
  output: 'server', // Use server for Cloudflare Pages
  adapter: cloudflare(),

  // Build configuration
  build: {
    // Inline stylesheets smaller than this size
    inlineStylesheets: 'auto',
  },

  // Vite configuration
  vite: {
    // Build optimizations
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Rollup options
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            'vendor': ['@instantdb/core'],
            'aws': ['@aws-sdk/client-s3'],
          }
        }
      }
    },
    // Development server configuration
    server: {
      // Enable CORS for development
      cors: true,
    }
  },

  // Site configuration - update this with your actual domain
  site: process.env.PUBLIC_PLATFORM_DOMAIN ? `https://${process.env.PUBLIC_PLATFORM_DOMAIN}` : 'https://your-storefront.pages.dev',

  // Redirects for better SEO
  redirects: {
    '/admin': '/auth/login',
    '/dashboard': '/auth/login'
  }
});
