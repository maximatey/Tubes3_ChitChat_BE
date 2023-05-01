function isValidExpression(expression) {
    const stack = [];
    let decimalFound = false;
    let count = 0;

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char >= '0' && char <= '9') {
            continue;
        } else if (char === '.') {
            if (decimalFound) {
                return false;
            }
            decimalFound = true;
            // Make sure the character before and after the decimal are valid
            const prevChar = expression[i - 1];
            const nextChar = expression[i + 1];
            if (prevChar && !(prevChar >= '0' && prevChar <= '9')) {
                return false;
            }
            if (nextChar && !(nextChar >= '0' && nextChar <= '9')) {
                return false;
            }
        } else if (['+', '-', '*', '/', '^', '(', ')'].indexOf(char) !== -1) {
            decimalFound = false;
            stack.push(char);
        } else {
            return false;
        }
    }

    for (let i = 0; i < stack.length; i++) {
        if (stack[i] === '(') {
            count++;
        } else if (stack[i] === ')') {
            count--;
        }
    }

    if (count !== 0) {
        return false;
    }

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char === '/') {
            const prevChar = expression[i - 1];
            const nextChar = expression[i + 1];
            if (nextChar === '0' || nextChar === '0.') {
                return false;
            }
        }
    }
    return true;
}

function calculator(expression) {
    expression = expression.replace(/\s/g, '');
    if (isValidExpression(expression)) {
        let tokens = expression.match(/(\d+(\.\d+)?)|([\+\-\*\/\^\(\)])/g);
        let numbers = [];
        let operators = [];
        let previousToken = null;
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (/\d+(\.\d+)?/.test(token)) {
                numbers.push(parseFloat(token));
            } else if (/[\+\-\*\/\^]/.test(token)) {
                if (previousToken !== null && /[\+\-\*\/\^]/.test(previousToken)) {
                    return "Persamaan Invalid! Periksa kembali persamaan anda";
                }
                while (operators.length > 0 && hasPrecedence(operators[operators.length - 1], token)) {
                    let b = numbers.pop();
                    let a = numbers.pop();
                    let operator = operators.pop();
                    let result = evaluate(a, operator, b);
                    numbers.push(result);
                }
                operators.push(token);
            } else if (/\(/.test(token)) {
                operators.push(token);
            } else if (/\)/.test(token)) {
                while (operators.length > 0 && !/\(/.test(operators[operators.length - 1])) {
                    let b = numbers.pop();
                    let a = numbers.pop();
                    let operator = operators.pop();
                    let result = evaluate(a, operator, b);
                    numbers.push(result);
                }
                operators.pop();
            }
            previousToken = token;
        }
        while (operators.length > 0) {
            let b = numbers.pop();
            let a = numbers.pop();
            let operator = operators.pop();
            let result = evaluate(a, operator, b);
            numbers.push(result);
        }
        return numbers[0];
    } else {
        return "Sintaks persamaan tidak sesuai";
    }
}


function hasPrecedence(operator1, operator2) {
    if (operator2 === '(' || operator2 === ')') {
        return false;
    }
    if ((operator1 === '*' || operator1 === '/') && (operator2 === '+' || operator2 === '-')) {
        return true;
    }
    if ((operator1 === '^') && (operator2 === '+' || operator2 === '-' || operator2 === '*' || operator2 === '/')) {
        return true;
    }
    return false;
}

function evaluate(a, operator, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '^':
            return Math.pow(a, b);
    }
}

// console.log(calculator("2 + 3")); // true
// console.log(calculator("2 * 3")); // true
// console.log(calculator("10.5 / 5")); // true
// console.log(calculator("4 ^ 0.5")); // true
// console.log(calculator("(2 + 3) * 4")); // true
// console.log(calculator("2 * (3 + 4)")); // true
// console.log(calculator("(5 + 3) * 2 ^ 2")); // true
// console.log(calculator("2a + 3b")); // false
// console.log(calculator("2 + 3 / 0")); // false
// console.log(calculator("(2 + 3")); // false
// console.log(calculator("2 + 3)")); // false
// console.log(calculator("2 + 3 / 0")); // false
// console.log(calculator("2 * 3")); // true
// console.log(calculator("10 / 5")); // true
// console.log(calculator("5+9*(2+4)")); // true
// console.log(calculator("8 + 7 +2 + *5")); // true
// console.log(calculator("1 / 0")); // true
// console.log(calculator("5 + 2 * 5")); // true
// console.log(calculator("8 + 7 +2 + *5")); // true

// export { calculator }; // Jika terhubung ke frontend
module.exports = { calculator };