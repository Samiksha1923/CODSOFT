const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = null;
let firstOperand = null;

function updateDisplay() {
  if(firstOperand !== null && operator !== null) {
    display.textContent = `${firstOperand} ${operator} ${currentInput}`;
  } else {
    display.textContent = currentInput || '0';
  }
}

function compute() {
  if(firstOperand === null || operator === null || currentInput === '') return;

  const a = parseFloat(firstOperand);
  const b = parseFloat(currentInput);
  let result = 0;

  switch(operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b === 0 ? 'Error' : a / b; break;
  }

  currentInput = result.toString();
  firstOperand = null;
  operator = null;
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.getAttribute('data-value');

    if(btn.id === 'clear') {
      currentInput = '';
      firstOperand = null;
      operator = null;
    } 
    else if(btn.id === 'backspace') {
      currentInput = currentInput.slice(0, -1);
    } 
    else if(btn.id === 'equals') {
      compute();
    } 
    else if(btn.classList.contains('operator')) {
      if(currentInput === '' && firstOperand === null) return; // nothing to do
      if(firstOperand !== null) {
        compute();
      }
      operator = value;
      firstOperand = currentInput;
      currentInput = '';
    } 
    else {
      currentInput += value;
    }

    updateDisplay();
  });
});
