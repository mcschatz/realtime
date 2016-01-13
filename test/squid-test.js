import Squid from '../lib/squid';
import Entity from '../lib/entity';
import World from '../lib/world';
import { assert } from 'chai';

describe('Squid', () => {

  it('exists', () => {
    assert(Squid);
  });
  
  
  it('inherits from Entity', () => {
    assert.equal(Object.getPrototypeOf(Squid), Entity);
  });
  
  it('should set itself as a block in the world', () => {
    let world = new World({ width: 100, height: 100 });
    let squid = new Squid(world);
    
    assert.include(world.squids, squid);
  });


});