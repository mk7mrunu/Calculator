class Calculator{
    constructor(reviousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){                    // clear our diff variables
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
    
    delete(){   
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    
    appendNumber(number){                                                                    //number will get added to the screen 
        if(number === '.' && this.currentOperand.includes('.')) return                       // if its already '.' it add one time & after that it will stop n add number
        this.currentOperand = this.currentOperand.toString() + number.toString()             //it will show particular number when we click on
    }

    chooseOperation(operation){                    //it will only choose a particular operation
        if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  
    }

    compute(){                                      //it will display the particular calculations
        let computation
        const prev = parseFloat(this.previousOperand)      // converts string to a number.
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return         // if user doesnt enter anything n clicks '=' on calci it will cancel this function completely
        switch (this.operation) {
            case '+':
              computation = prev + current
              break
            case '-':
              computation = prev - current
              break
            case '*':
              computation = prev * current
              break
            case '÷':
              computation = prev / current
              break
            default:
              return
          }
          this.currentOperand = computation
          this.operation = undefined
          this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits =  parseFloat(stringNumber.split('.')[0])  //its gonna take the first number in the array will be part before the period n 2nd no. will the part after the period
        const decimalDigits =  stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
        
    }

    updateDisplay() {           //it is gonna update the display 
        this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {                       //forEach is for looping all the buttons 
    button.addEventListener('click', () => {            //we have added event listener as click so whatever button we click will pop up the particular number
        calculator.appendNumber(button.innerText)       //it will add number on whatever is inside that button 
        calculator.updateDisplay()                      //it will update the display according to the buttons we click
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })