let currentInput = '0';
let previousInput = '';
let activeOperator = null;
let resetDisplayOnNextInput = false;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function appendNumber(num) {
    if (currentInput === '0' && num !== '.' || resetDisplayOnNextInput) {
        currentInput = num;
        resetDisplayOnNextInput = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (activeOperator !== null && !resetDisplayOnNextInput) calculate();
    previousInput = currentInput;
    activeOperator = operator;
    resetDisplayOnNextInput = true;
    updateDisplay();
}

function calculate() {
    if (activeOperator === null || resetDisplayOnNextInput) return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (activeOperator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
            if (current === 0) {
                currentInput = "Error: Div by 0";
                activeOperator = null;
                previousInput = '';
                updateDisplay();
                resetDisplayOnNextInput = true;
                return;
            }
            result = prev / current; 
            break;
        case '%': result = prev % current; break;
        default: return;
    }
    currentInput = result.toString();
    activeOperator = null;
    previousInput = '';
    resetDisplayOnNextInput = true;
    updateDisplay();
}

function clearScreen() {
    currentInput = '0';
    previousInput = '';
    activeOperator = null;
    resetDisplayOnNextInput = false;
    updateDisplay();
}

function deleteNumber() {
    if (resetDisplayOnNextInput || currentInput === 'Error: Div by 0') {
        clearScreen();
        return;
    }
    currentInput = currentInput.length <= 1 ? '0' : currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    currentDisplay.textContent = currentInput;
    if (activeOperator !== null) {
        let displaySymbol = activeOperator === '*' ? '×' : (activeOperator === '/' ? '÷' : activeOperator);
        previousDisplay.textContent = `${previousInput} ${displaySymbol}`;
    } else {
        previousDisplay.textContent = '';
    }
}
