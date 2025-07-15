// SEO utilities for the storefront

export function generateProductSchema(product, store) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} from ${store.name}`,
    "image": product.imageUrl || "/placeholder-product.jpg",
    "brand": {
      "@type": "Brand",
      "name": store.name
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": store.name
      }
    },
    "sku": product.id,
    "category": product.category || "General"
  };
}

export function generateStoreSchema(store) {
  return {
    "@context": "https://schema.org/",
    "@type": "Store",
    "name": store.name,
    "description": store.description || `Shop at ${store.name} for amazing products`,
    "url": `/store/${store.id}`,
    "image": store.logoUrl || "/placeholder-store.jpg"
  };
}

export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

export function generateSEOTags({
  title,
  description,
  image,
  url,
  type = 'website',
  schema,
  noIndex = false
}) {
  const tags = {
    title,
    description,
    canonical: url,
    openGraph: {
      title,
      description,
      image,
      url,
      type,
      siteName: 'Storefront Platform'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image
    },
    robots: noIndex ? 'noindex,nofollow' : 'index,follow'
  };

  if (schema) {
    tags.schema = schema;
  }

  return tags;
}

export function truncateText(text, maxLength = 160) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function generateMetaDescription(product, store) {
  if (product.description) {
    return truncateText(`${product.description} - Available at ${store.name}`, 160);
  }
  return truncateText(`Shop ${product.name} at ${store.name}. Great prices and quality products.`, 160);
}

export function generateStoreMetaDescription(store, productCount = 0) {
  const baseDescription = `Shop at ${store.name} for amazing products.`;
  if (productCount > 0) {
    return truncateText(`${baseDescription} Browse ${productCount} products with great prices and quality.`, 160);
  }
  return truncateText(baseDescription, 160);
}

// Generate sitemap data
export function generateSitemapUrls(stores, products) {
  const urls = [
    {
      url: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString()
    }
  ];

  // Add store pages
  stores.forEach(store => {
    urls.push({
      url: `/store/${store.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(store.updatedAt || store.createdAt).toISOString()
    });

    urls.push({
      url: `/store/${store.id}/products`,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    });
  });

  // Add product pages
  products.forEach(product => {
    urls.push({
      url: `/store/${product.storeId}/products/${product.id}`,
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date(product.updatedAt || product.createdAt).toISOString()
    });
  });

  return urls;
}
