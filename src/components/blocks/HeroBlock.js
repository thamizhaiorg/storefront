export function renderHeroBlock(block) {
  const section = document.createElement('section');
  section.className = 'hero-block relative py-20 px-4 min-h-screen flex items-center';

  // Background styling
  if (block.style?.backgroundColor) {
    section.style.backgroundColor = block.style.backgroundColor;
  } else {
    section.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  // Background image
  if (block.content?.backgroundImage) {
    section.style.backgroundImage = `url(${block.content.backgroundImage})`;
    section.style.backgroundSize = 'cover';
    section.style.backgroundPosition = 'center';

    // Add overlay
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black bg-opacity-40';
    section.appendChild(overlay);
  }

  const container = document.createElement('div');
  container.className = 'max-w-4xl mx-auto text-center relative z-10';

  // Title
  if (block.content?.title) {
    const title = document.createElement('h1');
    title.className = 'text-5xl md:text-6xl font-bold text-white mb-6';
    if (block.style?.titleColor) {
      title.style.color = block.style.titleColor;
    }
    title.textContent = block.content.title;
    container.appendChild(title);
  }

  // Subtitle
  if (block.content?.subtitle) {
    const subtitle = document.createElement('p');
    subtitle.className = 'text-xl md:text-2xl text-gray-200 mb-8';
    if (block.style?.subtitleColor) {
      subtitle.style.color = block.style.subtitleColor;
    }
    subtitle.textContent = block.content.subtitle;
    container.appendChild(subtitle);
  }

  // CTA Buttons
  if (block.content?.buttons && block.content.buttons.length > 0) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex flex-col sm:flex-row gap-4 justify-center';

    block.content.buttons.forEach((btn, index) => {
      const button = document.createElement('a');
      button.href = btn.url || '#';
      button.textContent = btn.text;

      if (index === 0) {
        // Primary button
        button.className = 'inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300';
      } else {
        // Secondary button
        button.className = 'inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300';
      }

      buttonContainer.appendChild(button);
    });

    container.appendChild(buttonContainer);
  }

  section.appendChild(container);
  return section;
}
