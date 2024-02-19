const btn = document.querySelectorAll('.btn')
const inputDisplay = document.querySelector('#user__text')
const outputDisplay = document.querySelector('#result__txt')

outputDisplay.value = ''
inputDisplay.value = ''
let countDigits = 0

for(let i = 0; i < btn.length ; i++){
    // event delegation  make the parent clickable the it's event will be transfered to  in children
    btn[i].addEventListener('click', e =>{
        const target = e.target
        // child element 
        if(target.matches('span')){
            try{

                if(outputDisplay.value !=''){
                    outputDisplay.value = ''
                }

                if(inputDisplay.value.length === 0 || inputDisplay.value === '') {
                    countDigits = 0
                }
                
                let expression = '' ;
                const value = e.target.innerText.trim()
                expression = inputDisplay.value
                // clear input feild and output field
                if(target.innerText === 'C'){
                    clearCalculator()
                    // check if the input field is not empty when  clicking equal sign
                 }else if (target.innerText === '='){
                  inputDisplay.value != '' ? calculate(expression) : outputDisplay.value = ''
                 }else {
                    // parsing the numbers
                    if(Number.parseFloat(value) || value === '0' || value === '00'){
                        countDigits += 1
                        if(countDigits >=1 && countDigits <=15){
                            // parse the numbers before diplaying them to  the screen
                            if(expression[0] === '0' || expression[0] === '00'){
                               inputDisplay.value = ''
                            }
                            inputDisplay.style.fontSize = countDigits >= 10 ? '25px' : '30px';
                            inputDisplay.value += value;
                           
                        }else{
                            outputDisplay.style.fontSize = '14px';
                            outputDisplay.value = 'Can\'t enter more than 15 digits';
                            setTimeout(() => {
                                outputDisplay.value = '';
                            }, 3000);
                        } 
                    } 
                 }



                 switch(target.innerText){
                    case '+' :
                        //adding expression
                        inputDisplay.value += '+'          
                        break
                    case '-' :
                        inputDisplay.value += '-'
                       break
                    case '/' :
                        if(inputDisplay.value != ''){
                           inputDisplay.value += '/'

                        } 

                        break
                    case 'x' :
                        if(inputDisplay != ''){
                            inputDisplay.value += 'x'

                        }
                        break
                    case '%' :
                        if(inputDisplay != ''){
                            inputDisplay.value += '%'

                        }
                        break;

                    case '.' :
                        if(inputDisplay.value != ''){
                            if (!inputDisplay.value.includes('.')) {      
                                inputDisplay.value += '.';

                            }
                        }
                         break;
                    case 'DE' :
                        if(inputDisplay.value != ''){
                            inputDisplay.value = expression.slice(0,-1)
                        }
                        break;
                }

            }catch(err){
                console.log(err)
            }
        }
    })
}


function clearCalculator() {
    inputDisplay.value = ''
    inputDisplay.value.length = 0
    outputDisplay.value = ''
    countDigits = 0
}

const calculate = expression =>{
    // array for storing operators found in the expression
    let operators = []
    // array for storing the numbers before finding the operator
    let numbers = []
    // start  index to keep track of a digit before oparator
    let startIndex = 0
    let i ;


    // check if the operator is a char or not 
    let isOperator = operator => ['+','-','/','x','%'].includes(operator)

    for(i = 0; i < expression.length; i++){
        if(isOperator(expression[i])){
            //push the operator to the array
            operators.push(expression[i])
            numbers.push(Number.parseFloat(expression.slice(startIndex, i)))
            startIndex = i + 1
        }
    }
    // push or add to the bottom of the array the last number
    numbers.push(Number.parseFloat(expression.slice(startIndex)))

    let result = numbers[0]
    for(let i = 0; i < operators.length; i++){
        switch (operators[i]) {
            case '+':
                result += numbers[i + 1];
                break;
            case '-':
                result -= numbers[i + 1];
                break;
            case 'x':
                result *= numbers[i + 1];
                break;
            case '%' :
                 result %= numbers[i+ 1]
                 break;
            case '/':
                if (numbers[i + 1] !== 0) {
                    result /= numbers[i + 1];
                } else {
                    //make the output font size small before diplaying the error text
                   outputDisplay.style.fontSize = '16px'
                   outputDisplay.value = 'Number too big or too small'
                   return null; 
                }
                break;
        }
        //font size backto it's normal font size
        outputDisplay.style.fontSize = '30px'
    }
    // make the output field to diplay only 10 digits 
    // make the output to be displayed in string
   result = result.toString()
   if(result.length > 10){
    result = Number(result).toFixed(10)
    if(!isNaN(result)){
        outputDisplay.value = result.toString()
    }

   }else{
    if(!isNaN(result)){
        outputDisplay.value = result.toString()
    }

   }
}
