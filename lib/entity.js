import Rectangle from './rectangle';

class Entity extends Rectangle {
  constructor(world, x, y, width, height) {
    super(x, y, width, height);
    this.world = world;
    this.world.entities.push(this);
  }
  
  moveUp() {
    if (this.canMoveUp) { this.y -= 1; }
    return this;
  }
  
  moveDown() {
    if (this.canMoveDown) { this.y += 1; }
    return this;
  }
  
  moveLeft() {
    if (this.canMoveLeft) { this.x -= 1; }
    return this;
  }
  
  moveRight() {
    if (this.canMoveRight) { this.x += 1; }
    return this;
  }
  
  get canMoveUp() {
    return this.y - 1 > 0;
  }
  
  get canMoveDown() {
    return this.y + 1 < this.world.height - this.height;
  }
  
  get canMoveLeft() {
    return this.x - 1 > 0;
  }
  
  get canMoveRight() {
    return this.x + 1 < this.world.width - this.width;
  }
  
}

export default Entity;