/**
 * Modern flat design input component
 * 
 * @param {Object} options - Input options
 * @param {string} [options.type='text'] - Input type
 * @param {string} [options.placeholder=''] - Placeholder text
 * @param {string} [options.value=''] - Initial value
 * @param {string} [options.name=''] - Input name
 * @param {string} [options.id=''] - Input id
 * @param {Function} [options.onChange] - Change handler
 * @param {boolean} [options.disabled=false] - Whether input is disabled
 * @param {boolean} [options.required=false] - Whether input is required
 * @param {string} [options.label=''] - Label text
 * @param {string} [options.errorMessage=''] - Error message
 * @returns {HTMLDivElement} Container with label and input
 */
export function createInput({
  type = 'text',
  placeholder = '',
  value = '',
  name = '',
  id = '',
  onChange,
  disabled = false,
  required = false,
  label = '',
  errorMessage = ''
}) {
  // Create container for the input group
  const container = document.createElement('div');
  container.className = 'mb-4';
  
  // Add label if provided
  if (label) {
    const labelElement = document.createElement('label');
    labelElement.className = 'block text-sm font-medium text-surface-700 mb-1';
    labelElement.textContent = label;
    
    if (id) {
      labelElement.htmlFor = id;
    }
    
    if (required) {
      const requiredMark = document.createElement('span');
      requiredMark.className = 'text-red-500 ml-1';
      requiredMark.textContent = '*';
      labelElement.appendChild(requiredMark);
    }
    
    container.appendChild(labelElement);
  }
  
  // Create input element
  const input = document.createElement('input');
  
  // Set attributes
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  
  if (name) input.name = name;
  if (id) input.id = id;
  if (disabled) input.disabled = true;
  if (required) input.required = true;
  
  // Add event handler
  if (onChange) {
    input.addEventListener('input', onChange);
  }
  
  // Apply styles
  input.className = 'w-full px-3 py-2 border border-surface-300 rounded-md bg-white ' +
    'focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 ' +
    'placeholder:text-surface-400 transition-colors';
  
  // Apply disabled styles
  if (disabled) {
    input.classList.add('bg-surface-100', 'text-surface-500', 'cursor-not-allowed');
  }
  
  // Apply error styles
  if (errorMessage) {
    input.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
  }
  
  container.appendChild(input);
  
  // Add error message if provided
  if (errorMessage) {
    const errorElement = document.createElement('p');
    errorElement.className = 'mt-1 text-sm text-red-600';
    errorElement.textContent = errorMessage;
    container.appendChild(errorElement);
  }
  
  return container;
}
