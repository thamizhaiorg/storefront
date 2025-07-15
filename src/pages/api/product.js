import { db } from '../../lib/instantdb.js';
import { handleApiError, NotFoundError, ValidationError, asyncHandler } from '../../lib/errorHandler.js';

export const prerender = false;

export const GET = asyncHandler(async ({ url }) => {
  const productId = url.searchParams.get('productId');

  if (!productId) {
    throw new ValidationError('Product ID is required');
  }

  const result = await new Promise((resolve, reject) => {
    const unsubscribe = db.subscribeQuery({
      products: {
        $: { where: { id: productId } }
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

  const products = result.data?.products || [];
  const product = products[0];

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return new Response(JSON.stringify({
    success: true,
    data: product
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
});
