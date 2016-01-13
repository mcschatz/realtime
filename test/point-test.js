import Point from '../lib/point';
import Rectangle from '../lib/rectangle';
import { assert } from 'chai';

describe('Point', () => {

  it('should exist', () => {
    assert(Point);
  });
  
  it('should instantiate a new instance', () => {
    let point = new Point();
    assert(point);
  });
  
  it('should have an "x" property', () => {
    let point = new Point(1, 2);
    assert.equal(point.x, 1);
  });
  
  it('should have an "y" property', () => {
    let point = new Point(1, 2);
    assert.equal(point.y, 2);
  });
  
  it('should have a string representation', () => {
    let point = new Point(1, 2);
    assert.equal(point.toString(), '(1,2)');
  });
  
  it('should have default values of (0,0)', () => {
    let point = new Point();
    assert.equal(point.x, 0);
    assert.equal(point.y, 0);
  });
  
  describe('#equals', () => {
    
    it('should return false if two points do no overlap', () => {
      let first = new Point(1, 1);
      let second = new Point(2, 2);
      assert.isFalse(first.equals(second));
    });
    
    it('should return true if two points do no overlap', () => {
      let first = new Point(1, 1);
      let second = new Point(1, 1);
      assert.isTrue(first.equals(second));
    });
    
  });
  
  describe('#isWithin', () => {
   
   it('should return true if the point is within the rectangle', () => {
     let rectangle = new Rectangle(0, 0, 10, 10);
     let point = new Point(0, 0);
     assert.isTrue(point.isWithin(rectangle)); 
   });
   
   it('should return false if the point is not within the rectangle', () => {
     let rectangle = new Rectangle(0, 0, 10, 10);
     let point = new Point(200, 200);
     assert.isFalse(point.isWithin(rectangle)); 
   });
    
  });

});