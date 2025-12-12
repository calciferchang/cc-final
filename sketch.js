/// <reference types="p5/global" />

const { Engine, Body, Bodies, Composite, Vector } = Matter;

let engine;

let balls = [];
let thickness = 10;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  bottomEdge = new Boundary(
    width / 2,
    height - thickness / 2,
    width,
    thickness,
  );
  topEdge = new Boundary(width / 2, thickness / 2, width, thickness);
  leftEdge = new Boundary(thickness / 2, height / 2, thickness, height);
  rightEdge = new Boundary(
    width - thickness / 2,
    height / 2,
    thickness,
    height,
  );
}

function draw() {
  background(220);
  Engine.update(engine);
  engine.gravity = Vector.create(0, 0);

  bottomEdge.display();
  leftEdge.display();
  rightEdge.display();
  topEdge.display();

  for (i = balls.length - 1; i >= 0; i--) {
    balls[i].checkEdges();
    balls[i].display();
    if (balls[i].done) {
      balls[i].remove();
      balls.splice(i, 1);
    }
  }
}

function mouseDragged() {
  balls.push(new Circle(mouseX, mouseY, random(10, 40)));
}

class Circle {
  constructor(x, y, r) {
    this.r = r;
    this.done = false;
    this.body = Bodies.circle(x, y, this.r);

    let magnitude = 5;
    let velocity = Vector.create(
      random(-magnitude, magnitude),
      random(-magnitude, magnitude),
    );
    Body.setVelocity(this.body, velocity);
    Composite.add(engine.world, this.body);
  }

  display() {
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
