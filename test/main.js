import assert from 'power-assert';
import BackgroundCreator from '../src/js/BackgroundCreator';

describe('class: BackgroundCreator', () => {
  describe('static method: calcCurrentValueOfColor', () => {

    const startColorObj = {
      R: 157,
      G: 114,
      B: 21,
      A: 0.2
    };
    const endColorObj = {
      R: 0,
      G: 0,
      B: 0,
      A: 0.4
    };

    it ('Case: rate === 0', () => {
      const colorObj = BackgroundCreator.calcCurrentValueOfColor(startColorObj, endColorObj, 0);
      assert(colorObj.R === 157);
      assert(colorObj.G === 114);
      assert(colorObj.B === 21);
      assert(colorObj.A.toFixed(1) === "0.2");
    });
    it ('Case: rate === 0.5', () => {
      const colorObj = BackgroundCreator.calcCurrentValueOfColor(startColorObj, endColorObj, 0.5);
      assert(colorObj.R === 78.5);
      assert(colorObj.G === 57);
      assert(colorObj.B === 10.5);
      assert(colorObj.A.toFixed(1) === "0.3");
    });
    it ('Case: rate === 1', () => {
      const colorObj = BackgroundCreator.calcCurrentValueOfColor(startColorObj, endColorObj, 1);
      assert(colorObj.R === 0);
      assert(colorObj.G === 0);
      assert(colorObj.B === 0);
      assert(colorObj.A.toFixed(1) === "0.4");
    });
  });
});
