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
  if(b.match(/^\d*\.?\d*$/) == null){
    clearDisplay()
  }else if(isNaN(b) == true){
    clearDisplay()
  }else {
    buttonClicked["lastResult"] = String(Math.round((parseFloat(a) + parseFloat(b))*100)/100)
    buttonClicked["number1"] = buttonClicked["lastResult"]}
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
function operate(operator, number1, number2){

  if(buttonClicked["number2"].match(/^\d*\.?\d*$/) == null || buttonClicked["number1"].match(/^\d*\.?\d*$/) == null || isNaN(buttonClicked["number2"] == true) ){
    clearDisplay()
    console.log("regex func")
  }else if (buttonClicked["operator"] == "+" && buttonClicked["number2"] !== "" ){
    // add(buttonClicked["number1"] , buttonClicked["number2"]);
    console.log(buttonClicked["number1"])
    console.log(buttonClicked["operator"])
    console.log(typeof(buttonClicked["number2"]))
    console.log(buttonClicked["lastResult"])
    console.log("hola")
  }else if (operator == "-"){
    substract(buttonClicked["number1"] , buttonClicked["number2"]);
    buttonClicked["number1"] = buttonClicked["lastResult"]
  } else if (operator == "*"){
     multiply(buttonClicked["number1"] , buttonClicked["number2"])
    buttonClicked["number1"] = buttonClicked["lastResult"]
  } else if (operator == "/"){
    divide(buttonClicked["number1"] , buttonClicked["number2"])
    buttonClicked["number1"] = buttonClicked["lastResult"]
  } else{ clearDisplay();   } 
      
  }


// store clicked numbers to do the math and updates display
function clickedNumber (){

  if(buttonClicked["operator"] == "" &&  buttonClicked["lastResult"] == "") {
    buttonClicked["number1"] += this.innerText
    displayContainer.innerText = buttonClicked["number1"]
  } else {
    buttonClicked["number2"] += this.innerText
    displayContainer.innerText = buttonClicked["number1"]+buttonClicked["operator"]+buttonClicked["number2"]
  }
    
}

// function executed when user presses operator, it saves values on operator and executes operate function

function clickedOperator (){
  passValuesRevised(buttonClicked["number1"],buttonClicked["operator"],buttonClicked["number2"])
  
  if(buttonClicked["number1"] == "") {
    displayContainer.innerText = ""
    // buttonClicked["number1"] = buttonClicked["lastResult"]
  }
  else if(buttonClicked["operator"] == ""){
    buttonClicked["operator"] = this.innerText
    displayContainer.innerText = buttonClicked["number1"]+buttonClicked["operator"]
  } 
  else if(buttonClicked["operator"] !== "" && buttonClicked["number2"] =="." ){
    buttonClicked["operator"] = this.innerText
    displayContainer.innerText = buttonClicked["number1"]+buttonClicked["operator"]+buttonClicked["number2"]
  } else{ 
    operate (buttonClicked["operator"],buttonClicked["number1"],buttonClicked["number2"])
    console.log("lastoperator")
    buttonClicked["number1"] = buttonClicked["lastResult"]
    buttonClicked["operator"] = this.innerText
    displayContainer.innerText = buttonClicked["number1"]+buttonClicked["operator"]
    buttonClicked["lastResult"] = ""
    buttonClicked["number2"] = ""
    decimalButton.addEventListener ("click",clickedNumber)
  }
  
 
}

// function to give result on display

function clickedGiveResult (){
  operate (buttonClicked["operator"],buttonClicked["number1"],buttonClicked["number2"])
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

  // if(buttonClicked["operator"] !==""){
  //   buttonsOperators.forEach(button => {button.removeEventListener ("click",clickedNumber)});
  // } buttonsOperators.forEach(button => {button.addEventListener ("click",clickedNumber)})
}

function clearDisplay (){
  displayContainer.innerText = ""
  buttonClicked["lastResult"] = ""
  buttonClicked["operator"] = ""
  buttonClicked["number2"] = ""
  buttonClicked["number1"] = ""
  decimalButton.addEventListener ("click",clickedNumber)
}

function passValuesRevised(number1,operator,number2){
 
  if(number1.match (/^\d*\.?\d*$/) != true){
    buttonClicked["number1"] = 0
  } else if(number2.match (/^\d*\.?\d*$/) != true){
    buttonClicked["number2"] = 0
  
  }else{clearDisplay()}
  }
