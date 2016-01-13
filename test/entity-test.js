import Entity from '../lib/entity';
import World from '../lib/world';
import Rectangle from '../lib/rectangle';
import { assert } from 'chai';

describe('Entity', () => {
  
  let world = new World({ width: 100, height: 100});

  it('exists', () => {
    assert(Entity);
  });
  
  it('inherits from Rectangle', () => {
    assert.equal(Object.getPrototypeOf(Entity), Rectangle);
  });
  
  it('has a world property', () => {
    let entity = new Entity(world);
    assert.equal(entity.world, world);
  });
  
  it('cannot move up if it is at the top of the world', () => {
    let entity = new Entity(world, 0, 0, 10, 10);
    assert.isFalse(entity.canMoveUp);
  });
  
  it('cannot move down if it is at the bottom of the world', () => {
    let entity = new Entity(world, world.width - 10, world.height -10, 10, 10);
    assert.isFalse(entity.canMoveDown);
  });
  
  it('cannot move left if it is at the right edge of the world', () => {
    let entity = new Entity(world, 0, 0, 10, 10);
    assert.isFalse(entity.canMoveLeft);
  });
  
  it('cannot move right if it is at the right edge of the world', () => {
    let entity = new Entity(world, world.width - 10, world.height -10, 10, 10);
    assert.isFalse(entity.canMoveRight);
  });
  
  describe('#moveUp', () => {
  
    it('decrements the "y" property', () => {
      let entity = new Entity(world, 5, 5, 10, 10);
      assert.decreases( () => entity.moveUp(), entity, 'y' );
    });
    
    it('does not change the "y" property if it cannot move', () => {
      let entity = new Entity(world, 0, 0, 10, 10);
      assert.doesNotDecrease( () => entity.moveUp(), entity, 'y' );
    });
  
  });
  
  describe('#moveDown', () => {
  
    it('increments the "y" property', () => {
      let entity = new Entity(world, 5, 5, 10, 10);
      assert.increases( () => entity.moveDown(), entity, 'y' );
    });
    
    it('does not change the "y" property if it cannot move', () => {
      let entity = new Entity(world, world.width - 10, world.height -10, 10, 10);
      assert.doesNotIncrease( () => entity.moveDown(), entity, 'y' );
    });
  
  });
  
  describe('#moveLeft', () => {
  
    it('decrements the "x" property', () => {
      let entity = new Entity(world, 5, 5, 10, 10);
      assert.decreases( () => entity.moveLeft(), entity, 'x' );
    });
    
    it('does not change the "x" property if it cannot move', () => {
      let entity = new Entity(world, 0, 0, 10, 10);
      assert.doesNotIncrease( () => entity.moveLeft(), entity, 'x' );
    });
  
  });
  
  describe('#moveRight', () => {
  
    it('increments the "x" property', () => {
      let entity = new Entity(world, 5, 5, 10, 10);
      assert.increases( () => entity.moveRight(), entity, 'x' );
    });
    
    it('does not change the "y" property if it cannot move', () => {
      let entity = new Entity(world, world.width - 10, world.height -10, 10, 10);
      assert.doesNotIncrease( () => entity.moveRight(), entity, 'x' );
    });
  
  });
  
  describe('collision checking', () => {
  
    it.skip('should detect an entity directly above', () => {
      let world = new World({ width: 100, height: 100});
      let block = new Entity(world, 50, 50, 10, 10);
      let above = new Entity(world, 50, 41, 10, 10);
      
      assert.equal(block.entityAbove, above);
    });
  
  });

});