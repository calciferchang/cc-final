function drawTitleScene() {
  push();
  fill(
    0,
    0,
    0,
    mapTransparency(
      main.scrollTop,
      0,
      SCENES.title.bottom - SCENES.title.top,
      0,
      255,
    ),
  );
  text("i miss what the internet could have been", 80, 100);
  pop();
}

// Track state for circle spawn scenes
let sceneStates = {};

// Initialize a scene state if it doesn't exist
function initSceneState(sceneId) {
  if (!sceneStates[sceneId]) {
    sceneStates[sceneId] = {
      lastScrollTop: 0,
      circleCount: 0,
    };
  }
}

// Generic circle spawning scene
function circleSpawnScene(sceneId, spawnRate, maxCircles) {
  if (!SCENES[sceneId]) return;

  initSceneState(sceneId);
  let state = sceneStates[sceneId];

  push();

  // Calculate scroll position relative to scene start
  let relativeScroll = main.scrollTop - SCENES[sceneId].top;

  // Determine target number of circles based on scroll position
  let targetCircles = Math.floor(relativeScroll / spawnRate);
  targetCircles = Math.max(0, Math.min(targetCircles, maxCircles));

  // Scrolling down - add circles
  if (targetCircles > state.circleCount) {
    let circlesToAdd = targetCircles - state.circleCount;
    for (let i = 0; i < circlesToAdd; i++) {
      let x = random(width * 0.2, width * 0.8);
      let y = random(height * 0.2, height * 0.8);
      let r = random(10, 40);
      balls.push(new Circle(x, y, r));
      state.circleCount++;
    }
  }
  // Scrolling up - remove circles
  else if (targetCircles < state.circleCount) {
    let circlesToRemove = state.circleCount - targetCircles;
    for (let i = 0; i < circlesToRemove && balls.length > 0; i++) {
      let removedBall = balls.pop();
      removedBall.remove();
      state.circleCount--;
    }
  }

  // Update last scroll position
  state.lastScrollTop = relativeScroll;

  pop();
}

// Wrapper functions for specific scenes
function scene1() {
  circleSpawnScene("scene1", 20, 20); // spawnRate: 50, maxCircles: 20
}

function scene2() {
  circleSpawnScene("scene2", 30, 35); // spawnRate: 30, maxCircles: 35

  // Lerp all circles to a uniform radius based on scroll position
  if (SCENES.scene2) {
    let relativeScroll = main.scrollTop - SCENES.scene2.top;
    let sceneHeight = SCENES.scene2.top + 50 - SCENES.scene2.top;

    // Calculate progress through the scene (0 to 1)
    let progress = constrain(relativeScroll / sceneHeight, 0, 1);

    // Apply easing to the progress for smoother transition
    let easedProgress = easeInOutSine(progress);

    // Target radius to shrink to
    let targetRadius = 15;

    // Lerp amount (higher = faster transition)
    let lerpAmount = 0.1;

    // Apply lerp to all circles
    for (let ball of balls) {
      // Calculate the target based on eased progress
      let currentTarget = lerp(ball.originalR, targetRadius, easedProgress);
      ball.lerpRadius(currentTarget, lerpAmount);
    }
  }
}
