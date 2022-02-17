function start(limit = 1) {
  let sample = allSpace;
  let guesses = allSpace.slice(0, limit);
  let result = {};
  for (let i = 0; i < sample.length; i++) {
    const secret = sample[i];
    let secretGuess = new guess(secret);
    if (!secretGuess || !secretGuess.compare) {
      continue;
    }
    for (let j = 0; j < guesses.length; j++) {
      const currGuess = guesses[j];
      let newGuess = new guess(currGuess);
      if (!newGuess || !newGuess.compare) {
        continue;
      }
      let evaluatedGuess = secretGuess.compare(newGuess);
      let subset = getSubsetFromAGuess(evaluatedGuess);
      if (!result[currGuess]) result[currGuess] = new Array(sample.length);
      result[currGuess][i] = subset.length;
    }
  }
  console.log(result);
}
function testTheGuesses(guesses ) {
  let sample = allSpace;
  let result = {};
  let remaining = [];
  for (let i = 0; i < sample.length; i++) {
    const secret = sample[i];
    let secretGuess = new guess(secret);
    if (!secretGuess || !secretGuess.compare) {
      continue;
    }
    let subset = sample;
    for (let j = 0; j < guesses.length; j++) {
      const currGuess = guesses[j];
      let newGuess = new guess(currGuess);
      if (!newGuess || !newGuess.compare) {
        continue;
      }
      let evaluatedGuess = secretGuess.compare(newGuess);
      subset = getSubset(subset, evaluatedGuess);

      if (!result[currGuess]) result[currGuess] = new Array(sample.length);
      result[currGuess][i] = subset.length;
      if (subset.length > 10 && guesses.length - 1 == j)
        remaining.push(...subset);
    }
  }
  var r = {};
  for (let el of result[guesses[guesses.length - 1]]) {
    if (!r[el]) r[el] = 0;
    r[el]++;
  }
  console.log(remaining)
  return r;
}
