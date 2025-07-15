// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Enable Tailwind CSS
  integrations: [tailwind()],

  // Output configuration - use 'server' to allow server-side API routes
  output: 'server',

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

  // Site configuration
  site: 'https://your-domain.com', // Update this with your actual domain

  // Redirects for better SEO
  redirects: {
    '/admin': '/auth/login',
    '/dashboard': '/auth/login'
  }
});
