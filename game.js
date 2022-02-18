
let secretComponent = new guess("2+5+4=11");
let currentSubset = [];
let totalBits = 0;

const states = {
    "wrong": -1,
    "unknown": 0,
    "exists": 1,
    "right": 2
};
function block(num = 0, state = 0) {
    this.state = state;
    this.value = num;
}

function guess(equation) {
    if (!/^([0-9]|\*|\=|\+|\-|\/)+$/.test(equation))
        return showError(`the input (${equation}) contains invalid characters! only numbers and [+,-*,/,=] are allowed.`);

    let chars = equation.split("");

    if (chars.length != 8) {
        showError("block array length error", charArray);
        return;
    }

    let valid = eval(equation.split('=')[0].replace(/^0+/ig, "")) == eval(equation.split('=')[1].replace(/^0+/ig, ""))
    if (!valid)
        return showError(`the input (${equation}) is not a valid equation`);

    this.values = chars.map(a => new block(a));
    this.equation = equation;
    this.compare = (guess) => {
        for (let i = 0; i < guess.values.length; i++) {
            const comp = guess.values[i];
            for (let j = 0; j < this.values.length; j++) {
                const currGuess = this.values[j];
                if (comp.value == currGuess.value && i == j) {
                    comp.state = states["right"];
                    break;
                }
                else if (comp.value == currGuess.value) comp.state = states["exists"];
            }
            if (comp.state == states["unknown"]) comp.state = states["wrong"];
        }
        //For duplicates
        let frequencies = {};
        let currentFrequencies = {};
        this.values.forEach((a, i) => {
            if (!currentFrequencies[a.value]) currentFrequencies[a.value] = [];
            currentFrequencies[a.value].push(i);
        })
        guess.values.forEach((a, i) => {
            if (!frequencies[a.value]) frequencies[a.value] = [];
            frequencies[a.value].unshift(i);
        })

        guess.values.forEach(a => {
            if (currentFrequencies[a.value]
                && frequencies[a.value].length > currentFrequencies[a.value].length) {
                for (let i = 0; i < frequencies[a.value].length
                    && frequencies[a.value].length > currentFrequencies[a.value].length; i++) {
                    const index = frequencies[a.value][i];
                    let element = guess.values[index];
                    if (element.state != states["right"]) {
                        element.state = states["wrong"];
                        frequencies[a.value].splice(i, 1);
                        i--;
                    }
                }
            }
        })
        return guess;
    }
}

function evaluateGuess(equation) {
    if (equation.length != 8)
        return showError("the input must be 8 characters long!");
    let newGuess = new guess(equation);
    let result = secretComponent.compare(newGuess);
    drawGuess(result);
    return result;
}

function drawGuess(guess) {
    let container = document.getElementById("container")
    container.innerHTML += `<div class="row"></div>`;
    let currRow = container.lastChild;
    for (let index = 0; index < guess.values.length; index++) {
        const element = guess.values[index];
        let cls = element.state == 2 ? 'green' : element.state == 1 ? 'yellow' : 'black';
        const temp = `<div class="card-container ${cls}">${element.value}</div>`
        currRow.innerHTML += temp;
    }
}
