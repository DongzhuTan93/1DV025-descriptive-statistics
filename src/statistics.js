/**
 * Module for obtaining statistical analysis about a set of data.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Dongzhu Tan <dt222ha.student.lnu.se>
 * @version 1.1.0
 */

// ------------------------------------------------------------------------------
//  Type definitions
// ------------------------------------------------------------------------------

/**
 * Represents statistical summary.
 *
 * @typedef {object} StatisticalSummary
 * @property {number} average - The average value.
 * @property {number} maximum - The maximum value.
 * @property {number} median - The median value.
 * @property {number} minimum - The minimum value.
 * @property {number[]} mode - The mode value.
 * @property {number} range - The range value.
 * @property {number} standardDeviation - The standard deviation value.
 */

// ------------------------------------------------------------------------------
//  Public interface
// ------------------------------------------------------------------------------

/**
 * Takes an array and returns its average value.
 *
 * @param {Array} aveArr - The array to get average from.
 * @returns {number[]} - The resault of average value of array.
 */
export function average (aveArr) {
  checkArray(aveArr)
  const sum = aveArr.reduce((accumulator, currentAveArr) => accumulator + currentAveArr)
  return sum / aveArr.length
  // I got inspiration here: https://www.matteboken.se/lektioner/matte-1/sannolikhet-och-statistik/medelvarde-median-typvarde-och-variationsbredd
}

/**
 * Returns the maximum value of the array.
 *
 * @param {Array} maxArr - The array to get the maximum value from.
 * @returns {number} - The maximum value of the given array.
 */
export function maximum (maxArr) {
  checkArray(maxArr)
  const getMax = maxArr.reduce((a, b) => Math.max(a, b))
  return getMax
}

/**
 * Returns the median value of the copied array.
 *
 * @param {Array} medArr -The array to get the median value from.
 * @returns {number[]} - The median value of the array.
 */
export function median (medArr) {
  checkArray(medArr)
  const medArrCopy = Array.from(medArr)
  const sorted = medArrCopy.sort((a, b) => a - b)
  const middleOfTheArrs = sorted.length / 2
  if (sorted.length % 2 === 0) { // check if the arrays length is of odd number
    // ------------
    return (sorted[middleOfTheArrs - 1] + sorted[middleOfTheArrs]) / 2
  } else {
    return medArrCopy[Math.floor(middleOfTheArrs)]
  }
  // I got inspiration here: https://stackoverflow.com/questions/45309447/calculating-median-javascript
}

/**
 * The minimum value of the copied array will be return.
 *
 * @param {Array} minArr -The array to get the minimum value from.
 * @returns {numbers[]} - A resault of the minimum value of the array.
 */
export function minimum (minArr) {
  checkArray(minArr)
  const minArrCopy = Array.from(minArr)
  const nums = minArrCopy.sort((a, b) => a - b)
  return nums[0]
}

/**
 * The mode value of the array will be return.
 *
 * @param {Array} modeArr - The array to get the mode value from.
 * @returns {numbers[]} - A resault with the mode value of the array.
 */
export function mode (modeArr) {
  checkArray(modeArr)
  const frequencyTable = {} // create a frequencytable as a object.
  let result = []

  // Creates the frequencyTable object and adds every element number as a key. If a key exist then adds
  // 1 to the value related to the key.
  for (const num of modeArr) {
    if (!frequencyTable[num]) {
      frequencyTable[num] = 1
    } else {
      frequencyTable[num] += 1
    }

    let maxFreValue = 0

    // Check every value of every key in the frequencyTable array.
    // If a key is found with a value higher than previous keys, then
    // replace result with a new array with only the key index inside.
    // If a second key also has the highest value then push it to this array.
    for (const key in frequencyTable) {
      if (frequencyTable[key] > maxFreValue) {
        maxFreValue = frequencyTable[key]
        result = [Number(key)]
      } else if (maxFreValue === frequencyTable[key]) {
        result.push(Number(key))
      }
    }
  }
  return result.sort((a, b) => a - b)
  // I got inspiration here: https://www.youtube.com/watch?v=0V2Mi16xd04
  // https://www.youtube.com/watch?v=BB8N3BXfDWY&t=3141s
  // https://www.youtube.com/watch?v=KCnw7Gd8sWk
}

/**
 * The range value of the copied array will be return.
 *
 * @param {Array} rangArr - The array to get the mode value from.
 * @returns {numbers[]} - A resault with the range value of the array.
 */
export function range (rangArr) {
  checkArray(rangArr)
  const rangArrCopy = Array.from(rangArr)
  rangArrCopy.sort((a, b) => a - b)
  const result = rangArrCopy[rangArrCopy.length - 1] - rangArrCopy[0]
  return result
  // I got inspiration here: https://www.matteboken.se/lektioner/matte-1/sannolikhet-och-statistik/medelvarde-median-typvarde-och-variationsbredd
}

/**
 * The range value of the array will be return.
 *
 * @param {Array} sdArr -The array to get the mode value from.
 * @returns {numbers[]} - A resault with the range value of the array.
 */
export function standardDeviation (sdArr) {
  checkArray(sdArr)
  const n = sdArr.length
  const averageNumbers = sdArr.reduce((a, b) => a + b) / n

  const sumDifference = sdArr.map(elem => Math.pow((elem - averageNumbers), 2)).reduce((a, b) => a + b)
  let decimalNumber = Math.sqrt(sumDifference / n) // First calculate the square of the difference between all values and the average, and then sum these values.Then divide these values by the length of the array and take the square root of the final value.
  decimalNumber = decimalNumber.toFixed(4)
  return Number(decimalNumber)
  // I got inspiration here: https://www.matteboken.se/lektioner/matte-2/statistik/standardavvikelse
  // https://stackoverflow.com/questions/7343890/standard-deviation-javascript
}

/**
 * Create a function to check if the functions which i created will throws an exception if it exists. A string with the exception will be thrown then.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 */
function checkArray (numbers) {
  if (!Array.isArray(numbers)) {
    throw TypeError('The passed argument is not an array.')
  } else if (numbers.length === 0) {
    throw TypeError('The passed array contains no elements.')
  }

  for (let i = 0; i < numbers.length; i++) { // use a for loop to check every value in array.
    if (typeof numbers[i] !== 'number' || isNaN(numbers[i])) {
      throw TypeError('The passed array may only contain valid numbers.')
    }
  }
  // I got inspiration here: https://www.youtube.com/watch?v=hB4H-T-CTAM&t=3s
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
}

/**
 * Returns several descriptive statistics (average, maximum, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {StatisticalSummary} An object whose properties correspond to the descriptive statistics from the data set.
 */
export function summary (numbers) {
  checkArray(numbers)

  const resultObject = {
    average: average(numbers),
    maximum: maximum(numbers),
    median: median(numbers),
    minimum: minimum(numbers),
    mode: mode(numbers),
    range: range(numbers),
    standardDeviation: standardDeviation(numbers)
  }

  return resultObject
  // I got inspiration here:https://www.youtube.com/watch?v=5uSFjctQ8bY&t=804s
}
