/**
 * Modern flat design product card component
 * 
 * @param {Object} options - Product card options
 * @param {string} options.id - Product ID
 * @param {string} options.name - Product name
 * @param {number} options.price - Product price
 * @param {string} [options.description=''] - Product description
 * @param {string} [options.imageUrl=''] - Product image URL
 * @param {string} [options.category=''] - Product category
 * @param {boolean} [options.inStock=true] - Whether product is in stock
 * @param {string} [options.storeId=''] - Store ID
 * @returns {HTMLDivElement} The product card element
 */
export function createProductCard({
  id,
  name,
  price,
  description = '',
  imageUrl = '',
  category = '',
  inStock = true,
  storeId = ''
}) {
  // Create main card container
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg border border-surface-200 overflow-hidden hover:border-brand-300 transition-colors duration-300';
  
  // Create image container
  const imageContainer = document.createElement('div');
  imageContainer.className = 'h-48 bg-surface-100 flex items-center justify-center relative';
  
  // Add image or placeholder
  if (imageUrl) {
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = name;
    image.className = 'w-full h-full object-cover';
    imageContainer.appendChild(image);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'text-surface-400 text-center';
    
    const placeholderIcon = document.createElement('svg');
    placeholderIcon.className = 'mx-auto h-16 w-16 mb-2';
    placeholderIcon.setAttribute('fill', 'none');
    placeholderIcon.setAttribute('viewBox', '0 0 24 24');
    placeholderIcon.setAttribute('stroke', 'currentColor');
    
    const iconPath = document.createElement('path');
    iconPath.setAttribute('stroke-linecap', 'round');
    iconPath.setAttribute('stroke-linejoin', 'round');
    iconPath.setAttribute('stroke-width', '2');
    iconPath.setAttribute('d', 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4');
    
    placeholderIcon.appendChild(iconPath);
    
    const placeholderText = document.createElement('p');
    placeholderText.className = 'text-sm';
    placeholderText.textContent = 'No Image';
    
    placeholder.appendChild(placeholderIcon);
    placeholder.appendChild(placeholderText);
    imageContainer.appendChild(placeholder);
  }
  
  // Add category badge if provided
  if (category) {
    const categoryBadge = document.createElement('div');
    categoryBadge.className = 'absolute top-3 left-3 badge badge-brand';
    categoryBadge.textContent = category;
    imageContainer.appendChild(categoryBadge);
  }
  
  // Add out of stock badge if not in stock
  if (!inStock) {
    const stockBadge = document.createElement('div');
    stockBadge.className = 'absolute top-3 right-3 badge badge-error';
    stockBadge.textContent = 'Out of Stock';
    imageContainer.appendChild(stockBadge);
  }
  
  card.appendChild(imageContainer);
  
  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'p-6';
  
  // Add product name
  const nameElement = document.createElement('h3');
  nameElement.className = 'text-xl font-medium text-surface-900 mb-2';
  nameElement.textContent = name;
  contentContainer.appendChild(nameElement);
  
  // Add product description
  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'text-surface-600 mb-4 line-clamp-2';
  descriptionElement.textContent = description || 'No description available';
  contentContainer.appendChild(descriptionElement);
  
  // Create price and action container
  const actionContainer = document.createElement('div');
  actionContainer.className = 'flex justify-between items-center mb-4';
  
  // Add price
  const priceElement = document.createElement('span');
  priceElement.className = 'text-2xl font-medium text-brand-600';
  priceElement.textContent = `$${price.toFixed(2)}`;
  actionContainer.appendChild(priceElement);
  
  // Add add to cart button
  const addToCartBtn = document.createElement('button');
  
  if (inStock) {
    addToCartBtn.className = 'btn-accent px-4 py-2';
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.onclick = () => {
      // Call global addToCart function if available
      if (typeof window.addToCart === 'function') {
        window.addToCart(id, name, price);
      }
    };
  } else {
    addToCartBtn.className = 'btn-secondary px-4 py-2 opacity-50 cursor-not-allowed';
    addToCartBtn.textContent = 'Out of Stock';
    addToCartBtn.disabled = true;
  }
  
  actionContainer.appendChild(addToCartBtn);
  contentContainer.appendChild(actionContainer);
  
  // Add view details link
  if (storeId) {
    const viewDetailsLink = document.createElement('a');
    viewDetailsLink.href = `/store/${storeId}/products/${id}`;
    viewDetailsLink.className = 'btn-primary w-full justify-center';
    viewDetailsLink.textContent = 'View Details';
    contentContainer.appendChild(viewDetailsLink);
  }
  
  card.appendChild(contentContainer);
  
  return card;
}
