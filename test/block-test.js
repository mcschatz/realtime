import Block from '../lib/block';
import Entity from '../lib/entity';
import World from '../lib/world';
import { assert } from 'chai';

describe('Block', () => {

  it('exists', () => {
    assert(Block);
  });

  it('inherits from Entity', () => {
    assert.equal(Object.getPrototypeOf(Block), Entity);
  });

  it('should set itself as a block in the world', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world);

    assert.include(world.blocks, block);
  });

  it('should not be able to move up', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world);

    assert.isFalse(block.canMoveUp);
  });

  it('should not be able to move down', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world);

    assert.isFalse(block.canMoveDown);
  });

  it('should not be able to move left', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world);

    assert.isFalse(block.canMoveDown);
  });
  
  it('should not be able to move right', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world);

    assert.isFalse(block.canMoveRight);
  });

  it('should not move when told to move up', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world, 10, 10);
    
    block.moveUp();
    
    assert.equal(block.x, 10);
    assert.equal(block.y, 10);
  });

  it('should not move when told to move down', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world, 10, 10);
    
    block.moveDown();
    
    assert.equal(block.x, 10);
    assert.equal(block.y, 10);
  });
  
    it('should not move when told to move left', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world, 10, 10);
    
    block.moveLeft();
    
    assert.equal(block.x, 10);
    assert.equal(block.y, 10);
  });
  
    it('should not move when told to move right', () => {
    let world = new World({ width: 100, height: 100 });
    let block = new Block(world, 10, 10);
    
    block.moveRight();
    
    assert.equal(block.x, 10);
    assert.equal(block.y, 10);
  });

});
