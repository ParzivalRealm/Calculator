//event listeners and objects creation

let buttons = document.querySelectorAll("#number");
let buttonsOperators = document.querySelectorAll("#operator");
let displayContainer = document.querySelector(".calculatorDisplayContainerText")
let giveResultButton = document.querySelector("#giveResult")
let decimalButton = document.querySelector(".decimal")
let buttonClicked = {}
let buttonClear = document.querySelector(".buttonClear")

// initial objects
buttonClicked["number1"] = "";
buttonClicked["operator"] = "";
buttonClicked["number2"] = "";
buttonClicked["lastResult"] = "";

//Initial listeners

buttons.forEach(button => {button.addEventListener ("click", clickedNumber)});
buttonsOperators.forEach(button => {button.addEventListener ("click", clickedOperator)});
giveResultButton.addEventListener ("click", clickedGiveResult);
decimalButton.addEventListener ("click", removeEventListener);
buttonClear.addEventListener ("click", clearDisplay);

//math functions called by operate function

function add (a, b){
  buttonClicked["lastResult"] = String(Math.round((parseFloat(a) + parseFloat(b))*100)/100)
}
function substract (a, b){
  buttonClicked["lastResult"] = String(Math.round((parseFloat(a) - parseFloat(b))*100)/100)
}

function multiply(a, b){
  buttonClicked["lastResult"] = String(Math.round((parseFloat(a) * parseFloat(b))*100)/100)
}

function divide(a, b){
  buttonClicked["lastResult"] = String(Math.round((parseFloat(a) / parseFloat(b))*100)/100)
}

// operate function that pass math function params based on eventlisteners, and updates object value to display it
function operate(number1,operator,number2){

  if (operator == "+"){
    add(number1 , number2);
    buttonClicked["number1"] = buttonClicked["lastResult"]
    buttonClicked["number2"] = ""
  }else if (operator == "-"){
    substract(number1 , number2);
    buttonClicked["number1"] = buttonClicked["lastResult"]
    buttonClicked["number2"] = ""
  } else if (operator == "*"){
    multiply(number1 , number2)
    buttonClicked["number1"] = buttonClicked["lastResult"]
    buttonClicked["number2"] = ""
  } else if (operator == "/"){
    divide(number1 , number2)
    buttonClicked["number1"] = buttonClicked["lastResult"]
    buttonClicked["number2"] = ""
  } else{ clearDisplay();   } 
}

// store clicked numbers to do the math and updates display
function clickedNumber (){
  
  if(buttonClicked["number1"] == "" || buttonClicked["operator"] == ""){
    buttonClicked["number1"] += this.innerText
  } else {
    buttonClicked["number2"] += this.innerText
  } 
  updateDisplay()
}

// function executed when user presses operator and call for passValuesRevised function with some safelocks included

function clickedOperator (){

if(buttonClicked["number1"] == "") {
  clearDisplay()
} else if(buttonClicked["operator"] == ""){
  buttonClicked["operator"] = this.innerText
  decimalButton.addEventListener ("click",clickedNumber)
} else if (buttonClicked["number2"] != ""){
    passValuesRevised(buttonClicked["number1"],buttonClicked["operator"],buttonClicked["number2"])
    buttonClicked["operator"] = this.innerText
    decimalButton.addEventListener ("click",clickedNumber)
  }else if(buttonClicked["operator"] != "" ){ buttonClicked["operator"] =this.innerText}

 updateDisplay()
}

// function to give result on display, calls passValuesRevised function

function clickedGiveResult (){
  let number1 = buttonClicked["number1"]
  let operator = buttonClicked["operator"]
  let number2 = buttonClicked["number2"]

  passValuesRevised(number1,operator,number2)
  buttonClicked["lastResult"] = ""
  buttonClicked["operator"] = ""
  buttonClicked["number2"] = ""
  displayContainer.innerText = buttonClicked["number1"]
}

// remove event listeners on dot so users dont do multiple dots on number params

function removeEventListener (){
  if (buttonClicked["number1"].match (/\./) != null && buttonClicked["operator"] == ""){
    decimalButton.removeEventListener("click",clickedNumber)
  } 
  else if (buttonClicked["number2"].match (/\./) != null) {
    decimalButton.removeEventListener ("click",clickedNumber)
  } 

}

function clearDisplay (){
  displayContainer.innerText = ""
  buttonClicked["lastResult"] = ""
  buttonClicked["operator"] = ""
  buttonClicked["number2"] = ""
  buttonClicked["number1"] = ""
  decimalButton.addEventListener ("click",clickedNumber)
}
// check user input and calls on operate if valid values have been clicked

function passValuesRevised(number1,operator,number2){
  operator = buttonClicked["operator"]
  if(number1.match(/^\d+(\.\d{0,2})?$/) != null && number2.match (/^\d+(\.\d{0,2})?$/) != null ){
    operate(number1,operator,number2)
    console.log("values Revised And Passed")
  }else{
    buttonClicked["number2"] = ""
    buttonClicked["number1"] = ""
    console.log("values Revised And Not Passed")
    updateDisplay()
  }
}

// function to show numbers on calculator
function updateDisplay(){
  console.log("displayupdate")
  displayContainer.innerText = buttonClicked["number1"]+buttonClicked["operator"]+buttonClicked["number2"]
}

