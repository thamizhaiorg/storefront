// Test script to add sample data to InstantDB
console.log('Importing InstantDB...');
import { init, i, id } from '@instantdb/core';
console.log('InstantDB imported successfully');

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

console.log('Initializing database...');
const db = init({
  appId: 'f7e3fd28-2c57-4c1c-b591-5ecd1929c926',
  schema
});
console.log('Database initialized');

// Add sample stores and products
async function addSampleData() {
  try {
    const storeId1 = id();
    const storeId2 = id();
    const storeId3 = id();

    // Create stores
    await db.transact([
      db.tx.storefronts[storeId1].update({
        name: 'Tech Paradise',
        createdAt: Date.now(),
      }),
      db.tx.storefronts[storeId2].update({
        name: 'Fashion Hub',
        createdAt: Date.now(),
      }),
      db.tx.storefronts[storeId3].update({
        name: 'Home & Garden',
        createdAt: Date.now(),
      }),
    ]);

    console.log('Sample stores added successfully!');

    // Add sample products for Tech Paradise
    const techProducts = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 199.99,
        storeId: storeId1,
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced camera features',
        price: 699.99,
        storeId: storeId1,
      },
      {
        name: 'Laptop',
        description: 'Powerful laptop for work and gaming',
        price: 1299.99,
        storeId: storeId1,
      },
    ];

    // Add sample products for Fashion Hub
    const fashionProducts = [
      {
        name: 'Designer T-Shirt',
        description: 'Comfortable cotton t-shirt with modern design',
        price: 29.99,
        storeId: storeId2,
      },
      {
        name: 'Jeans',
        description: 'Classic blue jeans with perfect fit',
        price: 79.99,
        storeId: storeId2,
      },
      {
        name: 'Sneakers',
        description: 'Stylish sneakers for everyday wear',
        price: 129.99,
        storeId: storeId2,
      },
    ];

    // Add sample products for Home & Garden
    const homeProducts = [
      {
        name: 'Plant Pot',
        description: 'Beautiful ceramic plant pot for indoor plants',
        price: 24.99,
        storeId: storeId3,
      },
      {
        name: 'Garden Tools Set',
        description: 'Complete set of essential garden tools',
        price: 89.99,
        storeId: storeId3,
      },
      {
        name: 'Outdoor Chair',
        description: 'Comfortable outdoor chair for patio',
        price: 149.99,
        storeId: storeId3,
      },
    ];

    // Add all products
    const allProducts = [...techProducts, ...fashionProducts, ...homeProducts];
    const productTransactions = allProducts.map(product =>
      db.tx.products[id()].update({
        ...product,
        createdAt: Date.now(),
      })
    );

    await db.transact(productTransactions);

    console.log('Sample products added successfully!');
    console.log(`Added ${allProducts.length} products across 3 stores`);
    console.log('Store IDs:', { storeId1, storeId2, storeId3 });
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

// Run the script
console.log('Starting to add sample data...');
addSampleData().then(() => {
  console.log('Script completed successfully!');
  process.exit(0);
}).catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
