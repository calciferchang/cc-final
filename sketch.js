/// <reference types="p5/global" />

class Draggable {
  constructor(x, y, w, h) {
    this.dragging = false;
    this.rollover = false;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  contains(px, py) {
    return (
      px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h
    );
  }

  over() {
    this.rollover = this.contains(mouseX, mouseY);
  }

  pressed() {
    if (this.contains(mouseX, mouseY)) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}

let shape1;
let shape2;

function setup() {
  createCanvas(640, 360);
  shape1 = new Draggable(100, 100, 50, 50);
  shape2 = new Draggable(150, 100, 50, 50);
}

function draw() {
  background(255);
  shape1.over();
  shape1.update();
  shape1.show();
  shape2.over();
  shape2.update();
  shape2.show();
}

function mousePressed() {
  shape1.pressed();
  shape2.pressed();
}

function mouseReleased() {
  shape1.released();
  shape2.released();
}
