let lastScrollTop = 0;
let scrollThresholds = [];
let main = document.querySelector("main");

let SCENES = {};
let currentScene = "title";

// Update current scene based on scroll position
function updateCurrentScene() {
  // Loop through all scenes to find which one contains current scroll position
  for (let sceneId in SCENES) {
    let scene = SCENES[sceneId];

    if (main.scrollTop >= scene.top && main.scrollTop < scene.bottom) {
      currentScene = sceneId;
      return; // Found it, exit
    }
  }
  // If we get here, we're not in any scene
  currentScene = undefined;
}

// Handle scroll events
function handleScroll() {
  if (!main) return;

  updateCurrentScene();
  console.log(currentScene);
  switch (currentScene) {
    case "title":
      drawTitleScene();
      break;
    case "scene1":
      scene1();
      break;
    case "scene2":
      scene2();
      break;
    default:
      break;
  }
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

  // Get the margin-top of the first child to offset all scenes
  let firstChildMargin = 0;
  if (children.length > 0) {
    let firstChildStyles = window.getComputedStyle(children[0]);
    firstChildMargin = parseFloat(firstChildStyles.marginTop);
  }

  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (child.id) {
      scenes[child.id] = {
        top: floor(child.offsetTop - firstChildMargin),
        bottom: floor(child.offsetTop + child.offsetHeight - firstChildMargin),
      };
    }
  }
  // Modify first and last scenes
  const keys = Object.keys(scenes);
  if (keys.length > 0) {
    scenes[keys[0]].top -= 200; // Subtract 200 from first top
    scenes[keys[keys.length - 1]].bottom += 200; // Add 200 to last bottom
  }
  return scenes;
}
