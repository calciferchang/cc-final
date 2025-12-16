let lastScrollTop = 0;
let scrollThresholds = [];
let main = document.querySelector("main");
let currentScrollTop = main.scrollTop;

let SCENES = {};
let currentScene = "title";

// Handle scroll events
function handleScroll() {
  if (!main) return;
  currentScrollTop = main.scrollTop;

  switch (currentScene) {
    case "title":
      drawTitleScene();
  }

  lastScrollTop = currentScrollTop;
}

// Add a scroll threshold
function addScrollThreshold(scrollValue, repeatable = false) {
  scrollThresholds.push({
    value: scrollValue,
    repeatable: repeatable,
  });
}

// Create a circle when scroll threshold is reached
function createCircleAtScroll() {
  let x = random(width * 0.2, width * 0.8);
  let y = random(height * 0.2, height * 0.8);
  let r = random(10, 40);
  balls.push(new Circle(x, y, r));
}

function drawTitleScene() {
  push();
  fill(0, 0, 0, mapTransparency(currentScrollTop, 0, 200, 0, 255));
  text("title", width / 2, height / 2);
  pop();
}

// Ease in-out sine function
function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

// Map transparency between two points using p5.js map()
function mapTransparency(
  position,
  minPos = 0,
  maxPos = 200,
  minAlpha = 0,
  maxAlpha = 255,
) {
  // Normalize position to 0-1 range
  const normalizedPosition = map(position, minPos, maxPos, 0, 1);

  // Apply easing function
  const easedValue = easeInOutSine(normalizedPosition);

  // Scale to alpha range
  const alpha = map(easedValue, 0, 1, maxAlpha, minAlpha);

  return Math.round(alpha);
}

// Build scenes object from main children with IDs
function buildScenesFromDOM() {
  if (!main) return {};

  let scenes = {};
  let children = main.children;
  let mainRect = main.getBoundingClientRect();

  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (child.id) {
      let rect = child.getBoundingClientRect();
      // Calculate position relative to main's scroll container
      // This accounts for the element's position minus main's top position
      scenes[child.id] = {
        top: rect.top - mainRect.top + main.scrollTop,
      };
    }
  }

  return scenes;
}
