'use strict';
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log('Drive')
*/

// Functions:
/*
function logger() {
    console.log('Consola')
}

// calling / running / invoking
logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}

let juiceNow = fruitProcessor(2, 3)

console.log(juiceNow)
*/

/*
// function declaration
function calcAge1(birthYear) {
    return 2023 - birthYear;
}

const age1 = calcAge1(2000);
console.log(age1)

// Anonymous function / function expression
const calcAge2 = function (birthYear) {
    return 2023 - birthYear;
}

// Calling an anonymous function is exactly the same as a normal function
console.log(calcAge2(2000));
const age2 = calcAge2(2000);

console.log(age1, age2);
*/

// Arrow function
const calcAge3 = birthYear => 2023 - birthYear;
const age3= calcAge3(2000)
console.log(age3)

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2023 - birthYear;
    const retirement = 65 - age;
    //return retirement;
    return `${firstName} retires in ${retirement} years!`
}

console.log(yearsUntilRetirement(2000, 'Sebastián'));
