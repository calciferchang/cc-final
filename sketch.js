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
