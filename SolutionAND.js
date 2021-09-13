/**
* The following is the function where the solution shall be written
*/

function solution (input) {
  // strip all non-numeric characters from string, throw exception if string now empty
  const sanitisedInput = input.replace(/\D/g, '');

  if (sanitisedInput.length === 0) {
    throw new Error("Input must contain a number.");
  }

  // Avoids running function if there is only one permutation by creating set for unique digits and checking if size is 1
  const inputSet = new Set(sanitisedInput);
  if (inputSet.size === 1) {

    // If only 0 was input then return one 0 as leading zeroes are unnecessary
    if (inputSet.has('0')) {
      return '0';
    }

    return sanitisedInput;
  }
  let allPermutations = [];

  // Nested function to recursively find permutations of the given string.
  function permute(arr, k) {
    for (let i = k; i < arr.length; i ++) {
      // Initially swaps the first element with k, then recursively calls function
      // with k + 1
      [arr[i], arr[k]] = [arr[k], arr[i]];
      permute(arr, k + 1);
      [arr[k], arr[i]] = [arr[i], arr[k]];
      if (k === arr.length - 1) {
        allPermutations.push(parseInt(arr.join(""), 10));
      }
    }
  }

  permute([...sanitisedInput], 0);


  // Once algorithm returns, remove duplicate values by creating a set of all permutations
  // sort array with duplicates removed by descending order to get permutations
  return ([...new Set(allPermutations)].sort(function(a,b){return b-a})).join(); 
}

// some example inputs
console.log(solution('236')); // expected ouput 632,623,362,326,263,236
console.log(solution('A 3B2 C6D')); // expected ouput 632,623,362,326,263,236
// added example inputs
console.log(solution('1')); // expected output 1
console.log(solution('11')); // expected output 11
console.log(solution('000000000')); // expected output 0
console.log(solution('0001')) // expected output 1000, 100, 10, 1 (leading zeroes are disregarded i.e. 0010 is 10)
console.log(solution('Hello World!')) // expected to throw 'Input must contain a number.'