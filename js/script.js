const input = document.querySelector("div#input div");
const operatorsBtn = document.querySelectorAll("div.operators div");
const numbersBtn = document.querySelectorAll("div.numbers div");
const equalBtn = document.getElementById("equal");
const clearBtn = document.getElementById("clear");
let resultDisplayed = false;

numbersBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];
    if (!resultDisplayed) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      resultDisplayed &&
      (lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "÷" ||
        lastChar === "×")
    ) {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
});

operatorsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      let newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      input.innerHTML += e.target.innerHTML;
    }
  });
});

equalBtn.addEventListener("click", () => {
  let inputString = input.innerHTML; //25+20÷5÷4
  let numbers = inputString.split(/\+|\-|\×|\÷/g); //["25","20","5","4"]
  let operators = inputString.replace(/[0-9]|\./g, "").split(""); //["+","÷","÷"]
  let divide = operators.indexOf("÷");

  while (divide != -1) {
    numbers.splice(
      divide,
      2,
      parseFloat((numbers[divide] / numbers[divide + 1]).toPrecision(12))
    );
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(
      multiply,
      2,
      parseFloat((numbers[multiply] * numbers[multiply + 1]).toPrecision(12))
    );
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(
      subtract,
      2,
      parseFloat((numbers[subtract] - numbers[subtract + 1]).toPrecision(12))
    );
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(
      add,
      2,
      parseFloat(
        (parseFloat(numbers[add]) + parseFloat(numbers[add + 1])).toPrecision(
          12
        )
      )
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true;
});

clear.addEventListener("click", function () {
  input.innerHTML = "";
});
