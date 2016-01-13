class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  equals(point) {
    return this.x === point.x &&
           this.y === point.y;
  }
  
  isWithin(rectangle) {
    return rectangle.contains(this);
  }
  
  
  toString() {
    return `(${this.x},${this.y})`;
  }
}

export default Point;