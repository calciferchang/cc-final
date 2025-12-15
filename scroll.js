let lastScrollTop = 0;
let scrollThresholds = [];
let main = document.querySelector("main");

// Handle scroll events
function handleScroll() {
  if (!main) return;

  let currentScrollTop = main.scrollTop;

  // Check if any thresholds have been passed
  for (let i = scrollThresholds.length - 1; i >= 0; i--) {
    let threshold = scrollThresholds[i];
    if (
      currentScrollTop >= threshold.value &&
      lastScrollTop < threshold.value
    ) {
      // Threshold crossed going down
      createCircleAtScroll();
      // Remove threshold if it's set to trigger only once
      if (!threshold.repeatable) {
        scrollThresholds.splice(i, 1);
      }
    }
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
