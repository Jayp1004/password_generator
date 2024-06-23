const resultEL = document.getElementById('result')
const lengthEL = document.getElementById('length')
const uppercaseEL = document.getElementById('uppercase')
const lowercaseEL = document.getElementById('lowercase')
const numbersEL = document.getElementById('numbers')
const symbolsEL = document.getElementById('symbols')
const generateEL = document.getElementById('generate')
const clipboardEL = document.getElementById('clipboard')

const randomFunction = {
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    number: getRandomNumbers,
    symbol: getRandomSymbols
}


generateEL.addEventListener('click', () => {
    const length = +lengthEL.value
    const hasLower = lowercaseEL.checked
    const hasUpper = uppercaseEL.checked
    const hasNumber = numbersEL.checked
    const hasSymbol = symbolsEL.checked

    resultEL.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

clipboardEL.addEventListener('click', () => {
    const password = resultEL.innerText;
    if (!password) {
        return;
    }
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});


function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    let typeCount = lower + upper + number + symbol

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => {
        return Object.values(item)[0]
    })

    if (typeCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typeCount) {
        typesArr.forEach(type => {
            const keyFromRandomFunction = Object.keys(type)[0]
            generatedPassword += randomFunction[keyFromRandomFunction]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}


function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbols() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)]
}


