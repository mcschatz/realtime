import World from '../lib/world';
import Player from '../lib/player';
import { assert } from 'chai';

describe('World', () => {

  it('exists', () => {
    assert(World);
  });
  
  it('has a width property', () => {
    let world = new World({ width: 200, height: 100 });
    
    assert.equal(world.width, 200);
  });
  
  it('has a height property', () => {
    let world = new World({ width: 200, height: 100 });
    
    assert.equal(world.height, 100);
  });
  
  it.skip('has a player property', () => {
    let world = new World({ width: 200, height: 100 });
    
    assert(world.player, 'It does not have a player.');
    assert.instanceOf(world.player, Player, 'world.player is not an instance of Player');
  });
  
  describe('addBlock', () => {
    
    it('should add a block to the world', () => {
      let world = new World({ width: 200, height: 100 });
      let block = world.addBlock(0, 0);
      
      assert.include(world.blocks, block);
    });
    
  });
  
  describe('addSquid', () => {
  
   it('should add a block to the world', () => {
      let world = new World({ width: 200, height: 100 });
      let squid = world.addSquid(0, 0);
      
      assert.include(world.squids, squid);
    });
  
  });
  
  describe('findEntitiesThatCollideWith', () => {
    
    it('should not find the same entity colliding with itself', () => {
      let world = new World({ width: 200, height: 100 });
      let block = world.addBlock(50, 50, 10, 10);
      
      assert.notInclude(world.findEntitiesThatCollideWith(block), block);
    });
  
    it('should find entities that overlap with a given entity', () => {
      let world = new World({ width: 200, height: 100 });
      let first = world.addBlock(50, 50, 10, 10);
      let second = world.addBlock(51, 51, 10, 10);
      
      assert.include(world.findEntitiesThatCollideWith(first), second); 
    });
    
    it('should detect entities directly above another entity', () => {
      let world = new World({ width: 100, height: 100});
      let block = world.addBlock(50, 50, 10, 10);
      let above = world.addBlock(50, 40, 10, 10);
      
      assert.include(world.findEntitiesAbove(block), above);
    });
    
    it('should not include itself in the entities above', () => {
      let world = new World({ width: 100, height: 100});
      let block = world.addBlock(50, 50, 10, 10);

      assert.notInclude(world.findEntitiesAbove(block), block);
    });
    
    it('should detect entities directly below another entity', () => {
      let world = new World({ width: 100, height: 100});
      let block = world.addBlock(50, 50, 10, 10);
      let below = world.addBlock(50, 60, 10, 10);
      
      assert.include(world.findEntitiesBelow(block), below);
    });
    
    it('should not include itself in the entities below', () => {
      let world = new World({ width: 100, height: 100});
      let block = world.addBlock(50, 50, 10, 10);

      assert.notInclude(world.findEntitiesBelow(block), block);
    });
    
    it('should detect entities directly to the right of another entity', () => {
      let world = new World({ width: 100, height: 100});
      let block = world.addBlock(50, 50, 10, 10);
      let right = world.addBlock(60, 50, 10, 10);
      
      assert.include(world.findEntitiesToTheRightOf(block), right);
    });
    
    it('should not include itself in the entities to the right of', () => {
      let world = new World({ width: 100, height: 100});
      let block = world.addBlock(60, 50, 10, 10);

      assert.notInclude(world.findEntitiesToTheRightOf(block), block);
    });
    
    it('should detect entities directly to the left of another entity', () => {
      let world = new World({ width: 100, height: 100});
      let block = world.addBlock(50, 50, 10, 10);
      let left = world.addBlock(40, 50, 10, 10);
      
      assert.include(world.findEntitiesToTheLeftOf(block), left);
    });
    
    it('should not include itself in the entities to the left of', () => {
      let world = new World({ width: 100, height: 100});
      let block = world.addBlock(50, 50, 10, 10);

      assert.notInclude(world.findEntitiesToTheLeftOf(block), block);
    });
  
  });

});