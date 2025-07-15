export function renderCTABlock(block) {
  const section = document.createElement('section');
  section.className = 'cta-block py-16 px-4';
  
  // Apply custom styles
  if (block.style?.backgroundColor) {
    section.style.backgroundColor = block.style.backgroundColor;
  } else {
    section.style.backgroundColor = '#1f2937'; // Default dark background
  }
  
  const container = document.createElement('div');
  container.className = 'max-w-4xl mx-auto text-center';
  
  // Title
  if (block.content?.title) {
    const title = document.createElement('h2');
    title.className = 'text-4xl font-bold text-white mb-4';
    if (block.style?.titleColor) {
      title.style.color = block.style.titleColor;
    }
    title.textContent = block.content.title;
    container.appendChild(title);
  }
  
  // Subtitle
  if (block.content?.subtitle) {
    const subtitle = document.createElement('p');
    subtitle.className = 'text-xl text-gray-300 mb-8';
    if (block.style?.subtitleColor) {
      subtitle.style.color = block.style.subtitleColor;
    }
    subtitle.textContent = block.content.subtitle;
    container.appendChild(subtitle);
  }
  
  // CTA Button
  if (block.content?.buttonText && block.content?.buttonUrl) {
    const button = document.createElement('a');
    button.href = block.content.buttonUrl;
    button.className = 'inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300';
    button.textContent = block.content.buttonText;
    
    // Apply custom button styles
    if (block.style?.buttonColor) {
      button.style.backgroundColor = block.style.buttonColor;
    }
    if (block.style?.buttonTextColor) {
      button.style.color = block.style.buttonTextColor;
    }
    
    container.appendChild(button);
  }
  
  section.appendChild(container);
  return section;
}
