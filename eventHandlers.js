
function handleSubmitBtnClick(){
    let input = document.querySelector(".input-guess .txt-input");
    let equation = input.value;

    if (equation.length != 8) 
        return showError("the input must be 8 characters long!");

    let evaluatedGuess = evaluateGuess(equation);
    let subset = getSubsetFromAGuess(evaluatedGuess)
    console.log("Subset Length: ", subset.length);
    console.log("Subset Length: ", subset);
}
function handleChangeSecretBtnClick(){
    let input = document.querySelector(".manage-secret .txt-input");
    changeSecret( input.value)
}
function toggleSecret(){
    let element=document.querySelector('.change-secret');
    let isHidden = element.style.display =="none";
    element.style.display = isHidden?"inline-block":"none";
    let input=document.querySelector(".manage-secret .txt-input");
    input.value = secretComponent.equation;
}