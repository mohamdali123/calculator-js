class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return alert("just one operand");
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  percent() {
    if (this.currentOperand === "") return;
    else this.currentOperand = (this.currentOperand / 100).toString();
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
  sign() {
    this.currentOperand = (this.currentOperand * -1).toString();
  }
}

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".clearOne");
const allClearButton = document.querySelector(".clear");
const percentButton = document.querySelector(".percent");
const previousOperandTextElement = document.querySelector(".displaySmall");
const currentOperandTextElement = document.querySelector(".displayBig");
const signButton = document.querySelector(".sign");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
signButton.addEventListener("click", (button) => {
  calculator.sign();
  calculator.updateDisplay();
});
document.addEventListener("keypress", (event) => {
  let listNumbers = /[0-9]/g;
  let listOperators = /[+\-*\/]/g;
  if (event.key.match(listNumbers)) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key === ".") {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key.match(listOperators)) {
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  }
  if (event.key === "Enter" || event.key === "=") {
    calculator.compute();
    calculator.updateDisplay();
  }
  if (event.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  }
  if (event.which == "Suppr") {
    calculator.clear();
    calculator.updateDisplay();
  }
  if (event.key == "c") {
    calculator.delete();
    calculator.updateDisplay();
  }
});
