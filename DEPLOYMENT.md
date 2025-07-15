# Cloudflare Pages Deployment Guide

This guide explains how to deploy your storefront app to Cloudflare Pages.

## ✅ Deployment Ready!

Your app has been successfully configured for Cloudflare Pages deployment with:
- Cloudflare adapter installed and configured
- Build scripts optimized for production
- Environment variable configuration ready
- Redirects configured for proper routing
- Build verification passed

## Prerequisites

1. A Cloudflare account
2. Wrangler CLI installed globally: `npm install -g wrangler` (optional for CLI deployment)
3. Your environment variables ready (see `.env.example`)

## Method 1: Deploy via Cloudflare Dashboard (Recommended)

### Step 1: Connect Your Repository

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your Git repository (GitHub, GitLab, etc.)
4. Select your storefront repository

### Step 2: Configure Build Settings

- **Framework preset**: Astro
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty if repo root)

### Step 3: Set Environment Variables

In the Cloudflare Pages dashboard, go to Settings > Environment variables and add:

```
PUBLIC_INSTANT_APP_ID=f7e3fd28-2c57-4c1c-b591-5ecd1929c926
PUBLIC_R2_ACCOUNT_ID=5e77e754-369f-4006-a0d7-f428cad9006c
PUBLIC_R2_ACCESS_KEY_ID=c3827ec3b7fb19b6c35168478440a8c6
PUBLIC_R2_SECRET_ACCESS_KEY=8e6d899be792b0bee11201a6c9f6f83f865f2fce9f1ca2c3ff172ad35b5759e2
PUBLIC_R2_BUCKET_NAME=tarapp-pqdhr
PUBLIC_R2_REGION=auto
PUBLIC_R2_ENDPOINT=https://f6d1d15e6f0b37b4b8fcad3c41a7922d.r2.cloudflarestorage.com
PUBLIC_PLATFORM_DOMAIN=your-domain.pages.dev
```

**Important**: Set these for both "Production" and "Preview" environments.

### Step 4: Deploy

1. Click "Save and Deploy"
2. Your app will be built and deployed automatically
3. You'll get a `*.pages.dev` URL for your app

## Method 2: Deploy via Wrangler CLI

### Step 1: Authenticate

```bash
wrangler login
```

### Step 2: Build and Deploy

```bash
# Deploy to preview
npm run deploy:preview

# Deploy to production
npm run deploy:production
```

## Custom Domain Setup

1. In Cloudflare Pages dashboard, go to your project
2. Click "Custom domains" tab
3. Add your domain
4. Update DNS records as instructed
5. Update `PUBLIC_PLATFORM_DOMAIN` environment variable

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PUBLIC_INSTANT_APP_ID` | Your InstantDB app ID | `f7e3fd28-2c57-4c1c-b591-5ecd1929c926` |
| `PUBLIC_R2_ACCOUNT_ID` | Cloudflare R2 account ID | `5e77e754-369f-4006-a0d7-f428cad9006c` |
| `PUBLIC_R2_ACCESS_KEY_ID` | R2 access key ID | `c3827ec3b7fb19b6c35168478440a8c6` |
| `PUBLIC_R2_SECRET_ACCESS_KEY` | R2 secret access key | `8e6d899be792b0bee11201a6c9f6f83f865f2fce9f1ca2c3ff172ad35b5759e2` |
| `PUBLIC_R2_BUCKET_NAME` | R2 bucket name | `tarapp-pqdhr` |
| `PUBLIC_R2_REGION` | R2 region | `auto` |
| `PUBLIC_R2_ENDPOINT` | R2 endpoint URL | `https://account-id.r2.cloudflarestorage.com` |
| `PUBLIC_PLATFORM_DOMAIN` | Your app domain | `your-app.pages.dev` |

## Troubleshooting

### Build Fails

1. Check that all environment variables are set
2. Ensure Node.js version is compatible (18+)
3. Check build logs in Cloudflare Pages dashboard

### App Doesn't Load

1. Verify environment variables are correct
2. Check browser console for errors
3. Ensure InstantDB app ID is valid

### Routing Issues

1. Check `_redirects` file in public directory
2. Verify dynamic routes are configured correctly
3. Check Astro config output mode is set to 'hybrid'

## Performance Optimization

The app is configured with:
- Code splitting for vendor libraries
- CSS optimization
- Static asset caching
- Hybrid rendering for better performance

## Security Notes

- All environment variables prefixed with `PUBLIC_` are exposed to the client
- R2 credentials are client-side accessible (consider using signed URLs for production)
- InstantDB handles authentication and data security

## Support

For deployment issues:
1. Check Cloudflare Pages documentation
2. Review build logs in dashboard
3. Test locally with `npm run preview`
