function combinations (matchstickPattern) {
  let combinations = []

  for (let i = 0; i < matchstickPattern.length; i++) {
    let currentInt = matchstickPattern[i]

    for (let j = 0; j < currentInt.length; j++) {
      if (matchstickPattern[i][j] === 0) {
        continue // encountered a non-existent matchstick
      }

      let stringOuter = i.toString()
      let stringInner = j.toString()
      let isAddition = stringOuter === '1' && stringInner === '1' ? false : true

      combinations = combinations.concat(
        moveMatchStick([...matchstickPattern], [i, j], isAddition)
      )
    }
  }

  return combinations
}

function moveMatchStick (matchStickPattern, currentMatchstick, isAddition) {
  let validCombinations = []
  let outerIndex = currentMatchstick[0]
  let innerIndex = currentMatchstick[1]

  for (let i = 0; i < matchStickPattern.length; i++) {
    if (i === 1) {
      continue
    }

    for (let j = 0; j < matchStickPattern[i].length; j++) {
      if (i === outerIndex && j === innerIndex) {
        continue // dont place the matchstick on itself
      }

      if (matchStickPattern[i][j] === '1') {
        continue
      }

      matchStickPattern[outerIndex][innerIndex] = '0'
      matchStickPattern[i][j] = '1'

      if (validCombination(matchStickPattern, isAddition)) {
        validCombinations.push(convertToComputation(matchStickPattern))
      }

      matchStickPattern[outerIndex][innerIndex] = '1'
      matchStickPattern[i][j] = '0'
    }
  }

  return validCombinations
}

function validCombination (matchStickPattern, isAddition) {
  // validate the matckstick pattern
  // log if valid example: '0 + 4 = 4'

  let [firstDigit, secondDigit, result] = convertToComputation(
    matchStickPattern
  )

  if (isAddition) {
    return firstDigit + secondDigit === result
  } else {
    return firstDigit - secondDigit === result
  }
}

function convertToComputation (matchStickPattern) {
  let result =
    matchStickMap[matchStickPattern[matchStickPattern.length - 1].join('')]
  let firstDigit = matchStickMap[matchStickPattern[0].join('')]
  let secondDigit = matchStickMap[matchStickPattern[2].join('')]

  return [firstDigit, secondDigit, result]
}

const matchStickMap = {
  '0111111': 0,
  '0001100': 1,
  '0100001': 1,
  '1110110': 2,
  '1110011': 3,
  '1101001': 4,
  '1011011': 5,
  '1011111': 6,
  '0110001': 7,
  '1111111': 8,
  '1111011': 9
}

function renderer () {
  for (let matchstick in matchStickMap) {
    console.log('number is supposed to be: ', matchStickMap[matchstick])

    let top = ` ${matchstick[2]} \n`
    let middle = `${matchstick[3]}${matchstick[0]}${matchstick[1]} \n`
    let bottom = `${matchstick[4]}${matchstick[5]}${matchstick[6]} \n`

    console.log(top + middle + bottom)
  }
}

console.log(everyCombo())

function everyCombo () {
  for (let left in matchStickMap) {
    let leftString = left.split('')
    for (let right in matchStickMap) {
      let rightString = right.split('')

      for (let result in matchStickMap) {
        let resultString = result.split('')
        console.log(
          convertToComputation([
            leftString,
            ['1', '1'],
            rightString,
            resultString
          ])
        )
        combinations([leftString, ['1', '1'], rightString, resultString])

        console.log(
          convertToComputation([
            leftString,
            ['1', '0'],
            rightString,
            resultString
          ])
        )
        combinations([leftString, ['1', '0'], rightString, resultString])
      }
    }
  }
}

// notes
// need all combinations of valid matchsticks (need a count)
// must move one matchstick
// dont modify the equal sign
// plus sign can be modified but only the vertical matchstick
// single digits only (for now)
// int can be comprised of up to 7 matchsticks (upper bound)

// representation of a number
// decimal value is 6: binary representation of 6 w/ matchsticks is: 1011111

// matchStickPattern = [[1,0,1,1,1,1,1]]

//currentMatchstick === [0, 1];
