import Player from '../lib/player';
import Entity from '../lib/entity';
import World from '../lib/world';
import { assert } from 'chai';

describe('Player', () => {

  it('exists', () => {
    assert(Player);
  });
  
  
  it('inherits from Entity', () => {
    assert.equal(Object.getPrototypeOf(Player), Entity);
  });
  
  it('should set itself as the player in the world', () => {
    let world = new World({ width: 100, height: 100 });
    let player = new Player(world);
    
    assert.equal(world.player, player);
  });


});