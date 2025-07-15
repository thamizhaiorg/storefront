export function renderTextBlock(block) {
  const section = document.createElement('section');
  section.className = 'text-block py-8 px-4';
  
  // Apply custom styles
  if (block.style?.backgroundColor) {
    section.style.backgroundColor = block.style.backgroundColor;
  }
  if (block.style?.textColor) {
    section.style.color = block.style.textColor;
  }
  if (block.style?.textAlign) {
    section.style.textAlign = block.style.textAlign;
  }
  
  const container = document.createElement('div');
  container.className = 'max-w-4xl mx-auto';
  
  // Title
  if (block.content?.title) {
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold mb-4';
    title.textContent = block.content.title;
    container.appendChild(title);
  }
  
  // Content
  if (block.content?.text) {
    const text = document.createElement('div');
    text.className = 'prose prose-lg max-w-none';
    text.innerHTML = block.content.text.replace(/\n/g, '<br>');
    container.appendChild(text);
  }
  
  section.appendChild(container);
  return section;
}
