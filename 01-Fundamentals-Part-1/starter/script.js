// let js = 'amazing';

// console.log(40 + 8 + 23 + 10);

// country = 'Argentina';

// continent = 'America';

// population = 10_000_000;

// console.log(country, continent, population);

/*
// Let variables can change upon execution and can be undefined
let age = 30;
age = 31;

// Const variables cannot be reasigned later. Throws TypeError if i try to 
// Const can't be undefined
const birthYear = 1991;
*/

/*
// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = "Jonas";
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5;
x += 10; // x = x + 10 = 25
x *= 10; // x = x * 10 = 250
x++; // x = x + 1
x--; // x = x - 1 
console.log(x);

// Comparison operators 
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);
*/

/*
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

// 1
const markWeight = 78;
const markHeight = 1.69;

const johnWeight = 92;
const johnHeight = 1.95;

let markHigherBMI;

const markBMI = markWeight / (markHeight ** 2);
const johnBMI = johnWeight / (johnHeight ** 2);
console.log(markBMI);
console.log(johnBMI);

if (markBMI > johnBMI) {
    markHigherBMI = true;
}

else {
    markHigherBMI = false;
}

console.log(markHigherBMI);
*/

const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2023

const jonas = "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job

console.log(jonas);

// Template literals (f'strings)

const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);