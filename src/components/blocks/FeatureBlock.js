export function renderFeatureBlock(block) {
  const section = document.createElement('section');
  section.className = 'feature-block py-12 px-4';
  
  // Apply custom styles
  if (block.style?.backgroundColor) {
    section.style.backgroundColor = block.style.backgroundColor;
  }
  
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto';
  
  // Title
  if (block.content?.title) {
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold text-center mb-12';
    title.textContent = block.content.title;
    container.appendChild(title);
  }
  
  // Features grid
  if (block.content?.features && block.content.features.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    
    block.content.features.forEach(feature => {
      const featureCard = createFeatureCard(feature);
      grid.appendChild(featureCard);
    });
    
    container.appendChild(grid);
  }
  
  section.appendChild(container);
  return section;
}

function createFeatureCard(feature) {
  const card = document.createElement('div');
  card.className = 'text-center p-6';
  
  // Icon
  if (feature.icon) {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center';
    
    const icon = document.createElement('div');
    icon.className = 'text-2xl text-indigo-600';
    icon.innerHTML = feature.icon; // Could be emoji or SVG
    
    iconContainer.appendChild(icon);
    card.appendChild(iconContainer);
  }
  
  // Title
  if (feature.title) {
    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold mb-3';
    title.textContent = feature.title;
    card.appendChild(title);
  }
  
  // Description
  if (feature.description) {
    const description = document.createElement('p');
    description.className = 'text-gray-600';
    description.textContent = feature.description;
    card.appendChild(description);
  }
  
  return card;
}
