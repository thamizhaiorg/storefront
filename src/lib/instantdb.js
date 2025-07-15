import { init, i, id } from '@instantdb/core';

// Define the schema for our storefront
const schema = i.schema({
  entities: {
    storefronts: i.entity({
      name: i.string(),
      customDomain: i.string().optional(),
      homePageId: i.string().optional(),
      createdAt: i.date(),
    }),
    blocks: i.entity({
      type: i.string(),
      pageId: i.string(),
      order: i.number(),
      content: i.json().optional(),
      style: i.json().optional(),
      createdAt: i.date(),
    }),
    products: i.entity({
      name: i.string(),
      description: i.string().optional(),
      price: i.number(),
      storeId: i.string(),
      imageUrl: i.string().optional(),
      createdAt: i.date(),
    }),
    orders: i.entity({
      name: i.string(),
      email: i.string(),
      cart: i.json(),
      storeId: i.string(),
      createdAt: i.date(),
    }),
  },
});

// Global database instance
let dbInstance = null;

// Initialize the database - this will be called from client-side
export function createDB(appId) {
  if (!dbInstance && typeof window !== 'undefined') {
    dbInstance = init({
      appId,
      schema
    });
  }
  return dbInstance;
}

// Get the database instance (client-side only)
export function getDB() {
  if (typeof window === 'undefined') {
    return null;
  }

  // Try to get from window first (for inline scripts)
  if (window.INSTANT_DB_INSTANCE) {
    return window.INSTANT_DB_INSTANCE;
  }

  // Create if not exists and we have the app ID
  if (window.INSTANT_APP_ID && !dbInstance) {
    dbInstance = createDB(window.INSTANT_APP_ID);
    window.INSTANT_DB_INSTANCE = dbInstance;
  }

  return dbInstance;
}

// For backward compatibility
export const db = {
  get instance() {
    return getDB();
  }
};

export { i, id, schema };
