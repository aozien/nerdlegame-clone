

window.addEventListener('DOMContentLoaded',async (event) => {
    console.log("Loaded");
    let loader = document.querySelector("#analysis .loader");
    loader.style.display = "inline-block";

    await (async () => {
        let allSpaceResponse = await fetch('./nerdle-possibilities.txt');
        let allSpaceArr = await allSpaceResponse.text();
        allSpace = allSpaceArr.split("\r\n");
        InitializeGame();
    })();
});

function InitializeGame() {
    currentSubset = allSpace;
    document.getElementById("container").innerHTML = "";
    updateAnalysis(0, 0, currentSubset);
}

function updateAnalysis(currentBits, totalBits, currentSubset) {
    let loader = document.querySelector("#analysis .loader");
    let bitsContainer = document.getElementById("bits");
    let totalBitsContainer = document.getElementById("total-bits");
    let actualBitsContainer = document.getElementById("actual-bits");
    let remainingCountContainer = document.getElementById("remainingSubsetCount");
    let remainingListContainer = document.querySelector("#remainingSubset textArea");
    bitsContainer.innerText = currentBits.toLocaleString();
    totalBitsContainer.innerText = totalBits.toLocaleString();
    actualBitsContainer.innerText = (   Math.log2( allSpace.length/currentSubset.length)).toLocaleString();
    remainingCountContainer.innerText = currentSubset.length.toLocaleString();
    remainingListContainer.value = currentSubset.length > 1000 ? "Too many to display" : currentSubset.join("\n");
    loader.style.display = "none";
}

function changeSecret(newSecret) {
    secretComponent = new guess(newSecret);
    InitializeGame();
}

function showError(msg) {
    console.error(msg);
    alert(msg);
}

function handleSubmitBtnClick() {
    let input = document.querySelector(".input-guess .txt-input");
    let equation = input.value;

    if (equation.length != 8)
        return showError("the input must be 8 characters long!");

    let loader = document.querySelector("#analysis .loader");
    loader.style.display = "inline-block";
    console.log("loader", loader.style.display);
    setTimeout(() => {

        let evaluatedGuess = evaluateGuess(equation);
        let subset = getSubsetFromAGuess(evaluatedGuess);
        currentSubset = subset;
        let bits = calculateInformationBits(equation);
        totalBits += bits;

        updateAnalysis(bits, totalBits, currentSubset);
    }, 50)

    // console.log("Subset Length: ", subset.length);
    // console.log("Subset Length: ", subset);
}
function handleChangeSecretBtnClick() {
    let input = document.querySelector(".manage-secret .txt-input");
    changeSecret(input.value)
}
function toggleSecret() {
    let element = document.querySelector('.change-secret');
    let isHidden = element.style.display == "none";
    element.style.display = isHidden ? "inline-block" : "none";
    let input = document.querySelector(".manage-secret .txt-input");
    input.value = secretComponent.equation;
}

function downloadList() {
    downloadText("nerdle-possibilities.txt", allSpace.join("\r\n"));
}
function downloadText(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
