const matchstickMap = require('./matchstickMap');

function combinations(matchstickPattern) {
  let combinations = [];

  for (let i = 0; i < matchstickPattern.length; i++) {
    let currentPattern = matchstickPattern[i];

    for (let j = 0; j < currentPattern.length; j++) {
      if (!canMoveMatchstick(matchstickPattern, [i, j])) {
        continue;
      }

      combinations = combinations.concat(moveMatchStick([...matchstickPattern], [i, j]));
    }
  }

  return combinations;
}

function canMoveMatchstick(matchstickPattern, currentMatchstick) {
  let [outerIndex, innerIndex] = currentMatchstick;

  if (matchstickPattern[outerIndex][innerIndex] === '0') {
    return false; // empty space, matchstick does not exist
  }

  if (outerIndex === 1 && innerIndex === 0) {
    return false; // do not move the horizontal matchstick in the plus sign
  }

  return true;
}

function moveMatchStick(matchstickPattern, currentMatchstick) {
  let validCombinations = [];
  let outerIndex = currentMatchstick[0];
  let innerIndex = currentMatchstick[1];

  // always addition unless we're moving the vertical matchstick in the + sign
  let isAddition = outerIndex !== 1 || innerIndex !== 1;

  for (let i = 0; i < matchstickPattern.length; i++) {
    for (let j = 0; j < matchstickPattern[i].length; j++) {
      if ((i === outerIndex && j === innerIndex) || matchstickPattern[i][j] === '1') {
        continue; // dont place the matchstick onto itself or onto an existing matchstick
      }

      matchstickPattern[outerIndex][innerIndex] = '0';
      matchstickPattern[i][j] = '1';

      let expression = convertToExpression(matchstickPattern);

      if (validCombination(expression, isAddition)) {
        isAddition ? expression.splice(1, 0, '+') : expression.splice(1, 0, '-');
        expression.splice(expression.length - 1, 0, '=');

        validCombinations.push(expression);
      }

      matchstickPattern[outerIndex][innerIndex] = '1';
      matchstickPattern[i][j] = '0';
    }
  }

  return validCombinations;
}

function validExpression(expression) {
  let [firstDigit, secondDigit, result] = expression;
  return Number.isInteger(firstDigit) && Number.isInteger(secondDigit) && Number.isInteger(result);
}

function validCombination(expression, isAddition) {
  if (!validExpression(expression)) {
    return false;
  }

  let [firstDigit, secondDigit, result] = expression;

  if (isAddition) {
    return firstDigit + secondDigit === result;
  } else {
    return firstDigit - secondDigit === result;
  }
}

function convertToExpression(matchstickPattern) {
  let result = matchstickMap[matchstickPattern[matchstickPattern.length - 1].join('')];
  let firstDigit = matchstickMap[matchstickPattern[0].join('')];
  let secondDigit = matchstickMap[matchstickPattern[2].join('')];

  return [firstDigit, secondDigit, result];
}

function renderer() {
  for (let matchstick in matchstickMap) {
    let top = ` ${matchstick[2]} \n`;
    let middle = `${matchstick[3]}${matchstick[0]}${matchstick[1]} \n`;
    let bottom = `${matchstick[4]}${matchstick[5]}${matchstick[6]} \n`;

    console.log(top + middle + bottom);
  }
}

function everyCombo() {
  for (let left in matchstickMap) {
    let leftString = left.split('');

    for (let right in matchstickMap) {
      let rightString = right.split('');

      for (let result in matchstickMap) {
        let resultString = result.split('');
        let matchstickPattern = [leftString, ['1', '1'], rightString, resultString];
        let [firstDigit, secondDigit, resultDigit] = convertToExpression(matchstickPattern);
        let combos = combinations(matchstickPattern);

        console.log(`matchstick pattern is: ${firstDigit} + ${secondDigit} = ${resultDigit}`);
        console.log('combos are: ', combos);
      }
    }
  }
}

module.exports = {
  combinations,
  everyCombo,
  renderer,
  validCombination,
};
