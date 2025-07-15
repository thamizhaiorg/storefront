import { db, id } from '../../lib/instantdb.js';
import { handleApiError, ValidationError, asyncHandler } from '../../lib/errorHandler.js';

export const prerender = false;

export const POST = asyncHandler(async ({ request }) => {
  const { name, email, cart, storeId, phone, address, notes } = await request.json();

  // Validate required fields
  if (!name || !email || !cart || !storeId) {
    throw new ValidationError('Name, email, cart, and store ID are required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Please provide a valid email address');
  }

  // Validate cart is not empty
  if (!cart || Object.keys(cart).length === 0) {
    throw new ValidationError('Cart cannot be empty');
  }

  // Calculate order total (you might want to validate this against actual product prices)
  let orderTotal = 0;
  for (const [productId, quantity] of Object.entries(cart)) {
    if (quantity <= 0) {
      throw new ValidationError('Invalid quantity in cart');
    }
    // In a real app, you'd fetch the product price and calculate the total
  }

  // Create order object
  const orderData = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone?.trim() || null,
    address: address?.trim() || null,
    notes: notes?.trim() || null,
    cart,
    storeId,
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  // Save order to InstantDB
  await db.transact(
    db.tx.orders[id()].update(orderData)
  );

  return new Response(JSON.stringify({
    success: true,
    message: 'Order placed successfully! You will receive a confirmation email shortly.',
    data: {
      orderId: id(),
      status: 'pending'
    }
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
});
