/**
 * Modern flat design card component
 * 
 * @param {Object} options - Card options
 * @param {string} [options.title] - Card title
 * @param {string} [options.content] - Card content
 * @param {string} [options.imageUrl] - URL to image
 * @param {string} [options.imageAlt=''] - Image alt text
 * @param {string} [options.footer] - Footer HTML content
 * @param {boolean} [options.hover=true] - Whether to show hover effects
 * @param {string} [options.variant='default'] - Card style variant: 'default', 'bordered', 'flat'
 * @returns {HTMLDivElement} The card element
 */
export function createCard({
  title,
  content,
  imageUrl,
  imageAlt = '',
  footer,
  hover = true,
  variant = 'default'
}) {
  // Create main card container
  const card = document.createElement('div');
  
  // Apply base classes
  card.className = 'overflow-hidden rounded-lg';
  
  // Apply variant classes
  switch (variant) {
    case 'bordered':
      card.classList.add('bg-white', 'border', 'border-surface-200');
      break;
    case 'flat':
      card.classList.add('bg-surface-50');
      break;
    default: // default
      card.classList.add('bg-white');
  }
  
  // Apply hover effect if enabled
  if (hover) {
    if (variant === 'bordered') {
      card.classList.add('hover:border-brand-300', 'transition-colors', 'duration-300');
    } else {
      card.classList.add('hover:shadow-md', 'transition-shadow', 'duration-300');
    }
  }
  
  // Add image if provided
  if (imageUrl) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'h-48 bg-surface-100 relative';
    
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = imageAlt;
    image.className = 'w-full h-full object-cover';
    
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
  }
  
  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'p-6';
  
  // Add title if provided
  if (title) {
    const titleElement = document.createElement('h3');
    titleElement.className = 'text-xl font-medium text-surface-900 mb-2';
    titleElement.textContent = title;
    contentContainer.appendChild(titleElement);
  }
  
  // Add content if provided
  if (content) {
    const contentElement = document.createElement('p');
    contentElement.className = 'text-surface-600 mb-4';
    contentElement.textContent = content;
    contentContainer.appendChild(contentElement);
  }
  
  card.appendChild(contentContainer);
  
  // Add footer if provided
  if (footer) {
    const footerContainer = document.createElement('div');
    footerContainer.className = 'px-6 py-4 border-t border-surface-200';
    footerContainer.innerHTML = footer;
    card.appendChild(footerContainer);
  }
  
  return card;
}
