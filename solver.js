let allSpace;


// let allSpace = generatePropabilitySpace();

//--Generates the text file
function generatePropabilitySpace() {
  let space = [];
  for (let i = 10; i < 100; i++) {
    for (let j = 1; j < 10; j++) {
      space.push(`${i}*${j}=${i * j}`);
      space.push(`${j}*${i}=${i * j}`);
      space.push(`${i * j}/${j}=${i}`);
      space.push(`${i * j}/${i}=${j}`);
    }
  }
  let s1 = new Set(space);

  let space2 = [];
  for (let i = 10; i < 100; i++) {
    for (let j = 10; j < 100; j++) {
      space2.push(`${i}+${j}=${i + j}`);
      if (i - j > 0) space2.push(`${i}-${j}=${i - j}`);
    }
  }
  let s2 = new Set(space2);

  let space3 = [];
  for (let i = 1; i < 100; i++) {
    for (let j = 1; j < 100; j++) {
      for (let k = 1; k < 100; k++) {
        space3.push(`${i}+${j}+${k}=${i + j + k}`);
        space3.push(`${i}+${j}-${k}=${i + j - k}`);
        space3.push(`${i}+${j}*${k}=${i + j * k}`);
        if (j % k == 0) space3.push(`${i}+${j}/${k}=${i + j / k}`);

        space3.push(`${i}-${j}+${k}=${i - j + k}`);
        space3.push(`${i}-${j}-${k}=${i - j - k}`);
        space3.push(`${i}-${j}*${k}=${i - j * k}`);
        if (j % k == 0) space3.push(`${i}-${j}/${k}=${i - j / k}`);

        space3.push(`${i}*${j}+${k}=${i * j + k}`);
        space3.push(`${i}*${j}-${k}=${i * j - k}`);
        space3.push(`${i}*${j}*${k}=${i * j * k}`);
        if (j % k == 0) space3.push(`${i}*${j}/${k}=${(i * j) / k}`);

        if (i % j == 0) {
          space3.push(`${i}/${j}+${k}=${i / j + k}`);
          space3.push(`${i}/${j}-${k}=${i / j - k}`);
          space3.push(`${i}/${j}*${k}=${(i / j) * k}`);
          if (
            j % k == 0 &&
            Math.abs(i / j / k - Math.round(i / j / k)) < 0.0001
          )
            space3.push(`${i}/${j}/${k}=${i / j / k}`);
        }
      }
    }
  }
  let s3 = new Set(space3);

  let combinedSpaces = [...s1, ...s2, ...s3].filter(
    (x) => x.length == 8 && !x.includes("=-")
  ).filter(x=> !x.endsWith("=0"));
  return combinedSpaces;
}

function getSubset(arr, currGuess) {
  let filtered = arr;
 
  for (let i = 0; i < currGuess.values.length; i++) {
    let currBlock = currGuess.values[i];
    let mode =  currBlock.state;
    let char = currBlock.value;

    switch (mode) {
      case states["wrong"]: //-1
      case states["unknown"]: //0
      if(currGuess.values.some(x=> x.value==char && x.state != -1 && x.state !=0));
      else  filtered = filtered.filter((a) => !a.includes(char));

        break;

      case states["exists"]: //1
        filtered = filtered.filter(
          //   (a) => a.includes(char) && a.indexOf(char) != i
          (a) => a.includes(char) && !indexesOf(a, char).includes(i)
        );
        break;

      case states["right"]: //2
        filtered = filtered.filter(
          //   (a) => a.includes(char) && a.indexOf(char) == i
          (a) => a.includes(char) && indexesOf(a, char).includes(i)
        );
        break;
    }
    // console.log(filtered.length);
  }

  return filtered;
}

function getSubsetFromAGuess(guess) {
  let subset = getSubset(currentSubset, guess);
  return subset;
}

function indexesOf(str, char) {
  let indices = [];
  for (var i = 0; i < str.length; i++) {
    if (str[i] === char) indices.push(i);
  }
  return indices;
}
