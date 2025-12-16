let balls = [];
let thickness = 2;

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

function youveGotMail() {
  const div = document.createElement("div");

  // Style the div with absolute positioning at random visible location
  div.style.position = "fixed";
  div.style.left = Math.random() * (window.innerWidth - 100) + "px";
  div.style.top = Math.random() * (window.innerHeight - 100) + "px";
  div.style.pointerEvents = "none";
  div.style.zIndex = "1000";

  // Create the image element
  const img = document.createElement("img");
  img.src = "assets/mailbox.png";
  img.style.border = "1px solid black";
  img.style.display = "block";
  img.style.width = "100px";
  img.style.height = "100px";

  // Add image to div and div to body
  div.appendChild(img);
  document.body.appendChild(div);

  // Remove after 3 seconds
  setTimeout(() => {
    div.remove();
  }, 1000);
}
