import Rectangle from './Rectangle';
import Block from './block';
import Squid from './squid';

export default class World {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
    
    this.entities = [];
  }
  
  get blocks() {
    return this.entities.filter(entity => entity instanceof Block);
  }
  
  get squids() {
    return this.entities.filter(entity => entity instanceof Squid);
  }
  
  add(type, x, y, width, height) {
    return new type(this, x, y, width, height);
  }
  
  addBlock(x, y, width, height) {
    return this.add(Block, x, y, width, height);
  }
  
  addSquid(x, y, width, height) {
    return this.add(Squid, x, y, width, height);
  }
  
  findEntitiesThatCollideWith(entity) {
    return this.entities.filter(e => entity.overlaps(e) && !entity.equals(e));
  }
  
  findEntitiesAbove(entity) {
    return findAdjacentEntities.call(this, entity, entity.x, entity.y - 1, entity.width, 1);
  }
  
  findEntitiesBelow(entity) {
    return findAdjacentEntities.call(this, entity, entity.x, entity.y + 1, entity.width, entity.width, entity.height);
  }
  
  findEntitiesToTheLeftOf(entity) {
    return findAdjacentEntities.call(this, entity, entity.x - 1, entity.y, 1, 1);
  }
  
  findEntitiesToTheRightOf(entity) {
    return findAdjacentEntities.call(this, entity, entity.x + 1, entity.y, entity.width, entity.height);
  }
  
}

// Private Methods

function findAdjacentEntities(entity, offsetX, offsetY, width, height) {
  let rectangle = new Rectangle(offsetX, offsetY, width, height);
  return this.findEntitiesThatCollideWith(rectangle)
              .filter(e => e !== entity);
}