# Astro + Vanilla JS Multi-Tenant Storefront: Complete Setup & Instructions

This guide explains how to build a scalable, multi-tenant e-commerce storefront platform using Astro and vanilla JavaScript, with InstantDB for real-time data and Cloudflare R2 for media storage.

---



## 1. Install Dependencies

```bash
# Real-time database
npm install @instantdb/client
# Cloudflare R2 (S3-compatible)
npm install @aws-sdk/client-s3
# Styling (optional, but recommended)
npm install tailwindcss
npx tailwindcss init


## 3. Directory Structure

```
src/
  pages/
    index.astro                # Platform landing page
    store/
      [storeId]/
        index.astro            # Store homepage
        products/
          index.astro          # Product catalog
          [productId].astro    # Product details
        cart.astro             # Shopping cart
        checkout.astro         # Checkout
    auth/
      login.astro              # Customer login (magic code)
      verify.astro             # Code verification
  components/
    blocks/                    # Page building blocks (Hero, ProductGrid, etc.)
    ui/                        # Reusable UI components
  lib/
    instantdb.js               # InstantDB config
    r2.js                      # R2 config
    domainUtils.js             # Domain detection
public/
  assets/
    icon.png
    splash.png
```

## 4. Environment Variables

Create `.env` and `.env.production` in your Astro project root. Use the following variables (example values from your current setup):

```env
# InstantDB
PUBLIC_INSTANT_APP_ID=f7e3fd28-2c57-4c1c-b591-5ecd1929c926

# Cloudflare R2 Configuration
PUBLIC_R2_ACCOUNT_ID=5e77e754-369f-4006-a0d7-f428cad9006c
PUBLIC_R2_ACCESS_KEY_ID=c3827ec3b7fb19b6c35168478440a8c6
PUBLIC_R2_SECRET_ACCESS_KEY=8e6d899be792b0bee11201a6c9f6f83f865f2fce9f1ca2c3ff172ad35b5759e2
PUBLIC_R2_BUCKET_NAME=tarapp-pqdhr
PUBLIC_R2_REGION=auto
PUBLIC_R2_ENDPOINT=https://f6d1d15e6f0b37b4b8fcad3c41a7922d.r2.cloudflarestorage.com

# Platform domain
PUBLIC_PLATFORM_DOMAIN=yourplatform.com
```

> **Note:**
> Astro exposes only variables prefixed with `PUBLIC_` to the client/browser. If you need server-only secrets, use variables without the `PUBLIC_` prefix and access them in server code only.

## 5. InstantDB Integration (Vanilla JS)

**src/lib/instantdb.js**
```js
import { createClient } from '@instantdb/client';
export const db = createClient({ project: import.meta.env.PUBLIC_INSTANT_APP_ID });
```

## 6. Dynamic Routing & Store Detection

- Use Astro's `[storeId]` dynamic routes for `/store/[storeId]`.
- For custom domains, use a utility in `lib/domainUtils.js`:

```js
// lib/domainUtils.js
import { db } from './instantdb.js';
export async function detectStoreId(hostname) {
  if (hostname.endsWith('.yourplatform.com')) {
    return hostname.replace('.yourplatform.com', '');
  }
  // Lookup custom domain in InstantDB
  const stores = await db.query('storefronts').where('customDomain', '==', hostname).get();
  return stores[0]?.id || null;
}
```

## 7. Store Homepage Example (Vanilla JS Fetch)

**src/pages/store/[storeId]/index.astro**
```astro
---
import { db } from '../../../lib/instantdb.js';
const { storeId } = Astro.params;
const [store] = await db.query('storefronts').where('id', '==', storeId).get();
const blocks = await db.query('blocks').where('pageId', '==', store.homePageId).orderBy('order').get();
---
<html>
  <body>
    <h1>{store.name}</h1>
    <div id="blocks-root"></div>
    <script type="module">
      // Example: Render blocks with vanilla JS
      const blocks = Astro.glob('./blocks/*.js'); // Or fetch from API
      // Render logic here
    </script>
  </body>
</html>
```

## 8. Block Components (Vanilla JS)

**src/components/blocks/HeroBlock.js**
```js
export function renderHeroBlock(block) {
  const section = document.createElement('section');
  section.style.background = block.style?.backgroundColor || '#f0f0f0';
  section.innerHTML = `<h2>${block.content?.title || ''}</h2><p>${block.content?.subtitle || ''}</p>`;
  return section;
}
```

## 9. Cart & Checkout (Vanilla JS)

- Use localStorage or InstantDB for cart state.
- Use vanilla JS for add/remove/update cart actions.
- Use Astro islands or client-side JS for checkout/payment.

## 10. Authentication (Magic Code)

- Create a login form in `auth/login.astro`.
- Use vanilla JS to call InstantDB's magic code API for email login.

## 11. Deployment

- Deploy to Cloudflare Pages, Vercel, or Netlify.
- Use a single build for all stores (no per-store builds).
- Configure custom domains in your host’s dashboard and map to the correct storeId using middleware or server code.

## 12. SEO & Performance

- Use Astro’s built-in support for meta tags, Open Graph, and structured data.
- All static assets and pages are CDN-cached.
- Use SSR for dynamic content if needed, or SSG with revalidation.

---

**Summary:**

Astro + vanilla JS is a fast, scalable, and simple way to build multi-tenant storefronts. Use Astro for routing and static/SSR, vanilla JS for UI logic, and InstantDB for real-time data. You can add React/Vue/Svelte islands only where needed for interactivity.
