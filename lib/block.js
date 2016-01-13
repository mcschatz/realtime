import Entity from './entity';

export default class Block extends Entity {
  constructor(world, x, y, width, height) {
    super(world, x, y, width, height);
  }
  
  get canMoveUp() { return false; }
  get canMoveDown() { return false; }
  get canMoveLeft() { return false; }
  get canMoveRight() { return false; }
}