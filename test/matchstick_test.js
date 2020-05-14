const assert = require('assert');

const matchstick = require('../matchstick');

describe('combinations', function () {
  describe('6 + 4 = 4', function () {
    let combinations;
    let sixPlusFourEqualsFour = [
      ['1', '0', '1', '1', '1', '1', '1'],
      ['1', '1'],
      ['1', '1', '0', '1', '0', '0', '1'],
      ['1', '1', '0', '1', '0', '0', '1'],
    ];

    beforeEach(function () {
      combinations = matchstick.combinations(sixPlusFourEqualsFour);
    });

    it('returns two valid results', function () {
      assert.equal(combinations.length, 2);
      // combination 1: 0 + 4 = 4
      // combination 2: 8 - 4 = 4
    });

    it('returns the proper valid combinations', function () {
      combinations.forEach(combo => {
        let [operator] = combo.splice(1, 1);
        let isAddition = operator === '+';

        combo.splice(combo.length - 2, 1); // remove the equal sign

        assert.equal(matchstick.validCombination(combo, isAddition), true);
      });
    });
  });
});

describe('validCombination', function () {
  describe('with invalid expression', function () {
    let invalidExpression = [0, 4, 9];
    let isAddition = true;

    it('returns false', function () {
      assert.equal(matchstick.validCombination([invalidExpression], isAddition), false);
    });
  });

  describe('with valid expresssion', function () {
    let validExpression = [7, 2, 5];
    let isAddition = false;

    it('returns true', function () {
      assert.equal(matchstick.validCombination(validExpression, isAddition), true);
    });
  });

  describe('with invalid expression because of non-integers', function () {
    let invalidExpession = [5, null, 5];
    let isAddition = true;

    it('handles falsy values properly and does not treat them as 0', function () {
      assert.equal(matchstick.validCombination(invalidExpession, isAddition), false);
    });
  });
});
