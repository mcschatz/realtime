import Rectangle from '../lib/rectangle';
import Point from '../lib/point';
import { assert } from 'chai';

describe('Rectangle', () => {
  
  it('exists', () => {
    assert(Rectangle);
  });
  
  it('can instantiate an instance', () => {
    assert(new Rectangle());
  });

  it('has a "x" property', () => {
    let rectangle = new Rectangle(1, 2, 10, 20);
    assert.equal(rectangle.x, 1);
  });
  
  it('has a "y" property', () => {
    let rectangle = new Rectangle(1, 2, 10, 20);
    assert.equal(rectangle.y, 2);
  });
  
  it('has a "width" property', () => {
    let rectangle = new Rectangle(1, 2, 10, 20);
    assert.equal(rectangle.width, 10);
  });
  
  it('has a "height" property', () => {
    let rectangle = new Rectangle(1, 2, 10, 20);
    assert.equal(rectangle.height, 20);
  });
  
  it('defaults to (0,0) as the origin point', () => {
    let rectangle = new Rectangle();
    assert.equal(rectangle.x, 0);
    assert.equal(rectangle.y, 0);
  });
  
  it('defaults to 10 for width and height if omitted', () => {
    let rectangle = new Rectangle();
    assert.equal(rectangle.width, 10);
    assert.equal(rectangle.height, 10);
  });
  
  it('has a string representation', () => {
    let rectangle = new Rectangle(1, 2, 10, 20);
    assert.isString(rectangle.toString());
    assert.equal(rectangle.toString(), "[Rectangle origin: (1,2), size: (10 𝗫 20)]");
  });
  
  describe('#contains', () => {
    
    let rectangle = new Rectangle(1, 1, 20, 20);
    
    it('should return true if the point is in the rectangle', () => {
      let point = new Point(1, 1);
      assert.isTrue(rectangle.contains(point));
    });
    
    it('should return false if the point is not in the rectangle', () => {
      let point = new Point(1000, 1000);
      assert.isFalse(rectangle.contains(point));
    });
    
  });
  
  describe('#overlaps', () => {
    
    it('should return true if the two rectangles are the same', () => {
      let first = new Rectangle(1, 1, 10, 10);
      let second = new Rectangle(1, 1, 10, 10);
      assert.isTrue(first.overlaps(second));
    });
    
    it('should return false if the two rectangles are not the same', () => {
      let first = new Rectangle(1, 1, 10, 10);
      let second = new Rectangle(100, 100, 10, 10);
      assert.isFalse(first.overlaps(second));
    });
    
  });
  
});