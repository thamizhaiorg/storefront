/**
 * Modern flat design button component
 *
 * @param {Object} options - Button options
 * @param {string} options.label - Button text
 * @param {Function} options.onClick - Click handler
 * @param {string} [options.variant='primary'] - Button style variant: 'primary', 'secondary', 'accent', 'outline'
 * @param {string} [options.size='md'] - Button size: 'sm', 'md', 'lg'
 * @param {boolean} [options.disabled=false] - Whether button is disabled
 * @param {string} [options.icon] - Optional icon HTML to display before label
 * @returns {HTMLButtonElement} The button element
 */
export function createButton({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null
}) {
  const btn = document.createElement('button');

  // Set text content
  btn.textContent = label;

  // Add event handler
  if (onClick && !disabled) {
    btn.onclick = onClick;
  }

  // Set disabled state
  btn.disabled = disabled;

  // Apply base classes
  btn.className = 'inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-md';

  // Apply size classes
  switch (size) {
    case 'sm':
      btn.classList.add('px-3', 'py-1.5', 'text-sm');
      break;
    case 'lg':
      btn.classList.add('px-6', 'py-3', 'text-lg');
      break;
    default: // md
      btn.classList.add('px-4', 'py-2', 'text-base');
  }

  // Apply variant classes
  switch (variant) {
    case 'primary':
      btn.classList.add('bg-brand-500', 'text-white', 'hover:bg-brand-600',
        'focus:outline-none', 'focus:ring-2', 'focus:ring-brand-500', 'focus:ring-offset-1');
      break;
    case 'secondary':
      btn.classList.add('bg-surface-100', 'text-surface-700', 'hover:bg-surface-200',
        'focus:outline-none', 'focus:ring-2', 'focus:ring-surface-300', 'focus:ring-offset-1');
      break;
    case 'accent':
      btn.classList.add('bg-accent-500', 'text-white', 'hover:bg-accent-600',
        'focus:outline-none', 'focus:ring-2', 'focus:ring-accent-500', 'focus:ring-offset-1');
      break;
    case 'outline':
      btn.classList.add('border', 'border-surface-300', 'bg-transparent', 'text-surface-700',
        'hover:bg-surface-50', 'hover:border-surface-400', 'focus:outline-none',
        'focus:ring-2', 'focus:ring-surface-300', 'focus:ring-offset-1');
      break;
  }

  // Apply disabled styles
  if (disabled) {
    btn.classList.add('opacity-50', 'cursor-not-allowed');
  }

  // Add icon if provided
  if (icon) {
    btn.innerHTML = icon + ' ' + label;
  }

  return btn;
}
