export function renderProductGridBlock(block) {
  const section = document.createElement('section');
  section.className = 'product-grid-block py-12 px-4';

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

  // Products grid
  if (block.content?.products && block.content.products.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

    block.content.products.forEach(product => {
      const productCard = createProductCard(product, block.content.storeId);
      grid.appendChild(productCard);
    });

    container.appendChild(grid);
  } else {
    // Empty state
    const emptyState = document.createElement('div');
    emptyState.className = 'text-center py-12';
    emptyState.innerHTML = `
      <p class="text-gray-500 text-lg">No products to display</p>
    `;
    container.appendChild(emptyState);
  }

  section.appendChild(container);
  return section;
}

function createProductCard(product, storeId) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300';

  // Product image
  const imageContainer = document.createElement('div');
  imageContainer.className = 'aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200';

  const img = document.createElement('img');
  img.src = product.imageUrl || '/placeholder-product.jpg';
  img.alt = product.name;
  img.className = 'w-full h-48 object-cover object-center group-hover:opacity-75';
  imageContainer.appendChild(img);

  // Product info
  const info = document.createElement('div');
  info.className = 'p-4';

  const name = document.createElement('h3');
  name.className = 'text-lg font-medium text-gray-900 mb-2';
  name.textContent = product.name;

  const description = document.createElement('p');
  description.className = 'text-sm text-gray-600 mb-3 line-clamp-2';
  description.textContent = product.description || '';

  const priceContainer = document.createElement('div');
  priceContainer.className = 'flex items-center justify-between';

  const price = document.createElement('span');
  price.className = 'text-xl font-bold text-gray-900';
  price.textContent = `$${product.price}`;

  const button = document.createElement('button');
  button.className = 'bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors';
  button.textContent = 'View Product';
  button.onclick = () => {
    window.location.href = `/store/${storeId}/products/${product.id}`;
  };

  priceContainer.appendChild(price);
  priceContainer.appendChild(button);

  info.appendChild(name);
  info.appendChild(description);
  info.appendChild(priceContainer);

  card.appendChild(imageContainer);
  card.appendChild(info);

  return card;
}
