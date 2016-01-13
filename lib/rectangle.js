import Point from './point';

export default class Rectangle {
  constructor(x = 0, y = 0, width = 10, height = 10) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  get lowerRightPoint() {
    return new Point(this.x + this.width, this.y + this.height);
  }
  
  contains(point) {
    for (let rectanglePoint of this) {
      if (point.equals(rectanglePoint)) { return true; }
    }
    return false;
  }
  
  overlaps(rectangle) {
    for (let point of this) {
      if (rectangle.contains(point)) { return true; }
    }
    return false;
  }
  
  equals(rectangle) {
    return this.x === rectangle.x &&
           this.y === rectangle.y &&
           this.width === rectangle.width &&
           this.height === rectangle.height;
  }
  
  *[Symbol.iterator]() {
    for (let x = this.x; x <= this.lowerRightPoint.x; x++) {
      for (let y = this.y; y <= this.lowerRightPoint.y; y++) {
        yield new Point(x, y);
      }
    }
  }
  
  toString() {
    let origin = `origin: (${this.x},${this.y})`;
    let size = `size: (${this.width} 𝗫 ${this.height})`;
    return `[Rectangle ${origin}, ${size}]`;
  }
}