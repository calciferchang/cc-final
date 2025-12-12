/// <reference types="p5/global" />

const { Engine, Body, Bodies, Composite, Vector } = Matter;

let engine;

let balls = [];

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();

  cafe = new Cafe(width / 2, height / 2, 200, 200, 4);
}

function draw() {
  background(220);
  Engine.update(engine);
  engine.gravity = Vector.create(0, 0);

  cafe.display();
  for (i = balls.length - 1; i >= 0; i--) {
    balls[i].checkEdges();
    balls[i].display();
    if (balls[i].done) {
      balls[i].remove();
      balls.splice(i, 1);
    }
  }
}

function mousePressed() {
  balls.push(new Circle(mouseX, mouseY, random(10, 40)));
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
    strokeWeight(3);
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
