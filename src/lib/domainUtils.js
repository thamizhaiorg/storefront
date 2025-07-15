import { db } from './instantdb.js';

export async function detectStoreId(hostname) {
  if (hostname.endsWith('.yourplatform.com')) {
    return hostname.replace('.yourplatform.com', '');
  }

  // Lookup custom domain in InstantDB
  try {
    const result = await new Promise((resolve, reject) => {
      const unsubscribe = db.subscribeQuery({
        storefronts: {
          $: { where: { customDomain: hostname } }
        }
      }, (resp) => {
        unsubscribe();
        if (resp.error) {
          reject(resp.error);
        } else {
          resolve(resp);
        }
      });
    });
    const stores = result.data?.storefronts || [];
    return stores[0]?.id || null;
  } catch (e) {
    console.error('Error detecting store ID:', e);
    return null;
  }
}
