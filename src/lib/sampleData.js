// Sample data for testing the storefront
import { db, id } from './instantdb.js';

export async function createSampleData() {
  try {
    // Create sample stores
    const store1Id = id();
    const store2Id = id();
    const store3Id = id();

    // Create sample pages
    const page1Id = id();
    const page2Id = id();
    const page3Id = id();

    // Create stores
    await db.transact([
      db.tx.storefronts[store1Id].update({
        name: "Tech Paradise",
        customDomain: "techparadise.com",
        homePageId: page1Id,
        createdAt: new Date()
      }),
      db.tx.storefronts[store2Id].update({
        name: "Fashion Forward",
        homePageId: page2Id,
        createdAt: new Date()
      }),
      db.tx.storefronts[store3Id].update({
        name: "Home & Garden",
        homePageId: page3Id,
        createdAt: new Date()
      })
    ]);

    // Create sample blocks for Tech Paradise
    await db.transact([
      db.tx.blocks[id()].update({
        type: "hero",
        pageId: page1Id,
        order: 1,
        content: {
          title: "Welcome to Tech Paradise",
          subtitle: "Discover the latest in technology and gadgets"
        },
        style: {
          backgroundColor: "#4F46E5"
        },
        createdAt: new Date()
      }),
      db.tx.blocks[id()].update({
        type: "text",
        pageId: page1Id,
        order: 2,
        content: {
          title: "About Our Store",
          text: "We offer the best selection of tech products at competitive prices. From smartphones to laptops, we have everything you need."
        },
        createdAt: new Date()
      }),
      db.tx.blocks[id()].update({
        type: "cta",
        pageId: page1Id,
        order: 3,
        content: {
          title: "Shop Now",
          subtitle: "Don't miss out on our amazing deals",
          buttonText: "Browse Products",
          link: `/store/${store1Id}/products/`
        },
        createdAt: new Date()
      })
    ]);

    // Create sample blocks for Fashion Forward
    await db.transact([
      db.tx.blocks[id()].update({
        type: "hero",
        pageId: page2Id,
        order: 1,
        content: {
          title: "Fashion Forward",
          subtitle: "Stay ahead of the trends with our curated collection"
        },
        style: {
          backgroundColor: "#EC4899"
        },
        createdAt: new Date()
      }),
      db.tx.blocks[id()].update({
        type: "text",
        pageId: page2Id,
        order: 2,
        content: {
          title: "Our Collection",
          text: "From casual wear to formal attire, we have everything you need to look your best. Quality fabrics, modern designs, and affordable prices."
        },
        createdAt: new Date()
      })
    ]);

    // Create sample blocks for Home & Garden
    await db.transact([
      db.tx.blocks[id()].update({
        type: "hero",
        pageId: page3Id,
        order: 1,
        content: {
          title: "Home & Garden",
          subtitle: "Transform your space with our beautiful collection"
        },
        style: {
          backgroundColor: "#059669"
        },
        createdAt: new Date()
      }),
      db.tx.blocks[id()].update({
        type: "cta",
        pageId: page3Id,
        order: 2,
        content: {
          title: "Create Your Dream Space",
          subtitle: "Browse our extensive collection of home and garden products",
          buttonText: "Shop Collection",
          link: `/store/${store3Id}/products/`
        },
        createdAt: new Date()
      })
    ]);

    // Create sample products
    await db.transact([
      // Tech Paradise products
      db.tx.products[id()].update({
        name: "iPhone 15 Pro",
        description: "The latest iPhone with advanced camera system and A17 Pro chip",
        price: 999.99,
        storeId: store1Id,
        imageUrl: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
        createdAt: new Date()
      }),
      db.tx.products[id()].update({
        name: "MacBook Air M2",
        description: "Supercharged by M2 chip, incredibly thin and light laptop",
        price: 1199.99,
        storeId: store1Id,
        imageUrl: "https://via.placeholder.com/300x300?text=MacBook+Air",
        createdAt: new Date()
      }),
      db.tx.products[id()].update({
        name: "AirPods Pro",
        description: "Active Noise Cancellation and Spatial Audio",
        price: 249.99,
        storeId: store1Id,
        imageUrl: "https://via.placeholder.com/300x300?text=AirPods+Pro",
        createdAt: new Date()
      }),

      // Fashion Forward products
      db.tx.products[id()].update({
        name: "Designer Dress",
        description: "Elegant evening dress perfect for special occasions",
        price: 199.99,
        storeId: store2Id,
        imageUrl: "https://via.placeholder.com/300x300?text=Designer+Dress",
        createdAt: new Date()
      }),
      db.tx.products[id()].update({
        name: "Casual Jeans",
        description: "Comfortable and stylish denim jeans for everyday wear",
        price: 79.99,
        storeId: store2Id,
        imageUrl: "https://via.placeholder.com/300x300?text=Casual+Jeans",
        createdAt: new Date()
      }),
      db.tx.products[id()].update({
        name: "Summer Blouse",
        description: "Light and airy blouse perfect for warm weather",
        price: 49.99,
        storeId: store2Id,
        imageUrl: "https://via.placeholder.com/300x300?text=Summer+Blouse",
        createdAt: new Date()
      }),

      // Home & Garden products
      db.tx.products[id()].update({
        name: "Garden Planter Set",
        description: "Beautiful ceramic planters for your indoor and outdoor plants",
        price: 89.99,
        storeId: store3Id,
        imageUrl: "https://via.placeholder.com/300x300?text=Garden+Planters",
        createdAt: new Date()
      }),
      db.tx.products[id()].update({
        name: "Throw Pillows",
        description: "Decorative pillows to add comfort and style to your home",
        price: 29.99,
        storeId: store3Id,
        imageUrl: "https://via.placeholder.com/300x300?text=Throw+Pillows",
        createdAt: new Date()
      }),
      db.tx.products[id()].update({
        name: "Wall Art Set",
        description: "Modern abstract art prints to beautify your walls",
        price: 149.99,
        storeId: store3Id,
        imageUrl: "https://via.placeholder.com/300x300?text=Wall+Art",
        createdAt: new Date()
      })
    ]);

    console.log('Sample data created successfully!');
    return {
      success: true,
      stores: [
        { id: store1Id, name: "Tech Paradise" },
        { id: store2Id, name: "Fashion Forward" },
        { id: store3Id, name: "Home & Garden" }
      ]
    };
  } catch (error) {
    console.error('Error creating sample data:', error);
    return { success: false, error: error.message };
  }
}

export async function clearSampleData() {
  try {
    // This is a simple approach - in production you'd want more sophisticated cleanup
    console.log('Note: To clear data, use the InstantDB dashboard or implement specific deletion logic');
    return { success: true };
  } catch (error) {
    console.error('Error clearing sample data:', error);
    return { success: false, error: error.message };
  }
}
