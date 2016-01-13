import Entity from './entity';

class Player extends Entity {
  constructor(world, x, y, width, height) {
    super(world, x, y, width, height);
    this.world.player = this;
  }
}

export default Player;