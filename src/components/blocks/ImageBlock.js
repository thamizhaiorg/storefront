export function renderImageBlock(block) {
  const section = document.createElement('section');
  section.className = 'image-block py-8 px-4';
  
  // Apply custom styles
  if (block.style?.backgroundColor) {
    section.style.backgroundColor = block.style.backgroundColor;
  }
  
  const container = document.createElement('div');
  container.className = 'max-w-6xl mx-auto';
  
  // Title
  if (block.content?.title) {
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold text-center mb-8';
    title.textContent = block.content.title;
    container.appendChild(title);
  }
  
  // Image
  if (block.content?.imageUrl) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'text-center';
    
    const img = document.createElement('img');
    img.src = block.content.imageUrl;
    img.alt = block.content.alt || block.content.title || 'Image';
    img.className = 'max-w-full h-auto rounded-lg shadow-lg mx-auto';
    
    // Apply image styles
    if (block.style?.imageWidth) {
      img.style.maxWidth = block.style.imageWidth;
    }
    if (block.style?.imageHeight) {
      img.style.height = block.style.imageHeight;
      img.style.objectFit = 'cover';
    }
    
    imageContainer.appendChild(img);
    container.appendChild(imageContainer);
  }
  
  // Caption
  if (block.content?.caption) {
    const caption = document.createElement('p');
    caption.className = 'text-center text-gray-600 mt-4 italic';
    caption.textContent = block.content.caption;
    container.appendChild(caption);
  }
  
  section.appendChild(container);
  return section;
}
