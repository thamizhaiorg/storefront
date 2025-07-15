/**
 * Modern flat design badge component
 * 
 * @param {Object} options - Badge options
 * @param {string} options.text - Badge text
 * @param {string} [options.variant='brand'] - Badge style variant: 'brand', 'accent', 'success', 'warning', 'error'
 * @param {boolean} [options.rounded=true] - Whether badge has fully rounded corners
 * @returns {HTMLSpanElement} The badge element
 */
export function createBadge({
  text,
  variant = 'brand',
  rounded = true
}) {
  const badge = document.createElement('span');
  
  // Set text content
  badge.textContent = text;
  
  // Apply base classes
  badge.className = 'inline-flex items-center px-2 py-0.5 text-xs font-medium';
  
  // Apply rounded style if enabled
  if (rounded) {
    badge.classList.add('rounded-full');
  } else {
    badge.classList.add('rounded');
  }
  
  // Apply variant classes
  switch (variant) {
    case 'brand':
      badge.classList.add('bg-brand-100', 'text-brand-800');
      break;
    case 'accent':
      badge.classList.add('bg-accent-100', 'text-accent-800');
      break;
    case 'success':
      badge.classList.add('bg-green-100', 'text-green-800');
      break;
    case 'warning':
      badge.classList.add('bg-amber-100', 'text-amber-800');
      break;
    case 'error':
      badge.classList.add('bg-red-100', 'text-red-800');
      break;
    default:
      badge.classList.add('bg-surface-100', 'text-surface-800');
  }
  
  return badge;
}
