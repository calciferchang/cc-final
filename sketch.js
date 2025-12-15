/// <reference types="p5/global" />
const { Engine, Body, Bodies, Composite, Vector } = Matter;

let engine;

let balls = [];
let thickness = 2.5;
let lastScrollTop = 0;
let scrollThresholds = [];
let main = document.querySelector("main");

function setup() {
  let container = select("#sketch-container");
  let w = container.width;
  let h = container.height;
  createCanvas(w, h);
  select("canvas").parent("sketch-container");
  engine = Engine.create();

  cafe = new Cafe(width / 2, height / 2, width * 0.7, height * 0.7, thickness);

  // Set up scroll listener
  if (main) {
    main.addEventListener("scroll", handleScroll);
  }
  addScrollThreshold(100);
}

function draw() {
  clear();
  Engine.update(engine);
  engine.gravity = Vector.create(0, 0);

  cafe.display();
  for (i = balls.length - 1; i >= 0; i--) {
    balls[i].checkEdges();
    if (balls[i].done) {
      balls[i].remove();
      balls.splice(i, 1);
    }
  }
  for (i = 0; i < balls.length; i++) {
    balls[i].display();
  }
}

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

// Create a circle when scroll threshold is reached
function createCircleAtScroll() {
  let x = random(width * 0.2, width * 0.8);
  let y = random(height * 0.2, height * 0.8);
  let r = random(10, 40);
  balls.push(new Circle(x, y, r));
}

// Add a scroll threshold
function addScrollThreshold(scrollValue, repeatable = false) {
  scrollThresholds.push({
    value: scrollValue,
    repeatable: repeatable,
  });
}

class Circle {
  constructor(x, y, r) {
    this.r = r;
    this.done = false;
    this.body = Bodies.circle(x, y, this.r);

    let magnitude = 3;
    let velocity = Vector.create(
      random(-magnitude, magnitude),
      random(-magnitude, magnitude),
    );
    Body.setVelocity(this.body, velocity);
    Composite.add(engine.world, this.body);
  }

  display() {
    strokeWeight(thickness);
    ellipse(this.body.position.x, this.body.position.y, this.r * 2, this.r * 2);
  }

  checkEdges() {
    let x = this.body.position.x;
    let y = this.body.position.y;
    if (
      x + this.r < 0 ||
      x - this.r > width ||
      y + this.r < 0 ||
      y - this.r > height
    ) {
      this.done = true;
    }
  }
  remove() {
    Composite.remove(engine.world, this.body);
  }
}

class Cafe {
  constructor(x, y, w, h, thickness) {
    this.pos = { x: x, y: y };
    this.size = { w: w, h: h };
    this.thickness = thickness;
    this.margin = { x: (width - w) / 2, y: (height - h) / 2 };

    this.topEdge = Bodies.rectangle(
      width / 2,
      this.margin.y / 2,
      width,
      this.margin.y,
      {
        isStatic: true,
      },
    );
    this.rightEdge = Bodies.rectangle(
      width - this.margin.x / 2,
      height / 2,
      this.margin.x,
      height,
      {
        isStatic: true,
      },
    );
    this.leftEdge = Bodies.rectangle(
      this.margin.x / 2,
      height / 2,
      this.margin.x,
      height,
      {
        isStatic: true,
      },
    );
    this.bottomEdge = Bodies.rectangle(
      width / 2,
      height - this.margin.y / 2,
      width,
      this.margin.y,
      {
        isStatic: true,
      },
    );
    Composite.add(engine.world, [
      this.topEdge,
      this.leftEdge,
      this.bottomEdge,
      this.rightEdge,
    ]);
  }
  display() {
    rectMode(CENTER);
    strokeWeight(this.thickness);
    rect(
      this.pos.x,
      this.pos.y,
      this.size.w + this.thickness * 2,
      this.size.h + this.thickness * 2,
    );
  }
}
