// Create and initialize the fullscreen image overlay
let imageOverlay = null;
let overlayImg = null;

function initImageOverlay() {
  if (!imageOverlay) {
    imageOverlay = document.createElement('div');
    imageOverlay.className = 'fullscreen-image-overlay';

    overlayImg = document.createElement('img');
    imageOverlay.appendChild(overlayImg);

    document.body.appendChild(imageOverlay);
  }
}

// Setup hover image display for a link
function setupImageHover(linkElement, imageSrc) {
  initImageOverlay();

  linkElement.addEventListener('mouseenter', () => {
    overlayImg.src = imageSrc;
    imageOverlay.classList.add('active');
  });

  linkElement.addEventListener('mouseleave', () => {
    imageOverlay.classList.remove('active');
  });
}

// Helper function to setup by selector
function setupImageHoverBySelector(selector, imageSrc) {
  const element = document.querySelector(selector);
  if (element) {
    setupImageHover(element, imageSrc);
  }
}
