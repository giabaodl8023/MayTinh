class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand != '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computations;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computations = prev + current;
                break;
            case '-':
                computations = prev - current;
                break;
            case '*':
                computations = prev * current;
                break;
            case '/':
                computations = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computations;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intergerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(intergerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else{
            return integerDisplay;
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculators = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculators.appendNumber(button.innerText)
        calculators.updateDisplay();
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculators.chooseOperation(button.innerText)
        calculators.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculators.compute();
    calculators.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculators.delete();
    calculators.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculators.clear();
    calculators.updateDisplay();
})