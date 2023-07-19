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

/* LECTURE 35
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
*/

/*
// LECTURE 36

function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces!`
    return juice
}

console.log(fruitProcessor(2,3))
*/

/*
// Lecture 37
const calcAge = (birthYear) => 2023 - birthYear;

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;
    if (retirement <= 0) {
        return `${firstName} it's already on an age for retirement!`
    } else {
        return `${firstName} has ${retirement} years until retirement.`
    }
}

console.log(yearsUntilRetirement(1950, 'Sebastián Francinelli'))
*/

/*
// Lecture 38 (exercise)
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const scoreDolphins = calcAverage(85, 54, 41);
const scoreKoalas = calcAverage(23, 34, 27);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= (avgKoalas * 2)) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= (avgDolphins * 2)) {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    } else {
        console.log('No team wins...')
    }
}

checkWinner(scoreDolphins, scoreKoalas)
*/

/*
// Lecture 39 - Arrays
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends)

const years = new Array(1991, 1984, 2000, 2008, 2020);
console.log(years)

console.log(friends[0], friends[2], years[3])
console.log(friends.length)
console.log(friends[friends.length -1]);

friends[2] = 'Jay';
console.log(friends);
*/

/*
// Lecture 40

// Add elements
const friends = ['Michael', 'Steven', 'Peter'];
let newLength = friends.push('Jay');
console.log(friends, newLength);

newLength = friends.unshift('John');
console.log(friends, newLength);

// Remove elements
let removedValue = friends.pop(); // Last
console.log(friends, removedValue);

removedValue = friends.shift(); // First
console.log(friends, "///", removedValue);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob')); // Returns -1 cause it doesn't exists.

friends.push(23);
console.log(friends.includes('Steven')); // true
console.log(friends.includes('Bob')); // false
console.log(friends.includes('23')); // false
console.log(friends.includes(23)); // true

if (friends.includes('Peter')) {
    console.log('El array contiene a Peter')
}
*/

/*
// Exercise:
let tip;

function calcTip(bill) {
    if (bill >= 50 && bill <= 300) {
        tip = bill * 0.15;
    } else {
        tip = bill * 0.20;
    }
    return tip;
}

const tip100 = calcTip(100);
console.log(tip100);

const bills = [125, 555, 44];
const tips = [];

tips.push(calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]));
console.log(tips);

const totals = [];

totals.push(`${bills[0]} + ${calcTip(bills[0])}`, `${bills[1]} + ${calcTip(bills[1])}`, `${bills[2]} + ${calcTip(bills[2])}`);
console.log(totals)
*/


/*
// Lecture 42
// Objects (dictionary)

const person = {
    firstName: 'John',
    lastName: 'Lastname',
    age: 2023 - 2000,
    job: 'teacher', 
    friends: ['Michael', 'Peter', 'Steven'],
};

// With bracket notation we can use expressions 
const nameKey = 'Name';
console.log(person['first' + nameKey]);
console.log(person['last' + nameKey]);

// With dot notation we have to use the key name to access the property
console.log(person.firstName);
console.log(person.lastName);

const interestedIn = prompt('What do you want to know about this person? Choose between firstName, lastName, age, job and friends.');

if (person[interestedIn]) {
    console.log(person[interestedIn]);
} else {
    console.log('Wrong request!');
    const interestedIn = prompt('What do you want to know about this person? Choose between firstName, lastName, age, job and friends.');
}

person.location = 'Portugal';
person['github'] = 'link de GitHub'

console.log(person);

console.log(`${person.firstName} has ${person.friends.length} friends, and his best friend is called ${person.friends[0]}`)
*/

/*
// Lecture 43
const person = {
    firstName: 'John',
    lastName: 'Lastname',
    birthYear: 2000,
    job: 'teacher', 
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

    // calcAge: function(birthYear) {
    //     return 2023 - birthYear
    // }

    // calcAge: function () {
    //     // console.log(this);
    //     return 2023 - this.birthYear;
    // }

    calcAge: function () {
        this.age = 2023 - this.birthYear
        return this.age;
    },

    getSummary: function() {
        return `${this.firstName} is a ${this.calcAge()} years old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }
};

console.log(person.calcAge());
console.log(person.age);
// console.log(person['calcAge'](2000))

// "Jonas is a 46 years old teacher, and he has a driver's license"
console.log(`${person.firstName} is a ${person.age} years old ${person.job}, and he ${person.hasDriversLicense ? 'has' : "doesn't have"} a driver's license`)
console.log(person.getSummary());
*/

/*
// Lecture 43 / Exercise
const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    },
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,

    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    },
}

john.calcBMI();
mark.calcBMI();

if (john.calcBMI() > mark.calcBMI()) {
    console.log(`${john.fullName}'s BMI ${(john.bmi)} is higher than ${mark.fullName}'s (${mark.bmi})!`);
} else {
    console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`);
}
*/

/*
// Lecture 46 / Loops
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifgting weights repetition ${rep} 🏋️‍♂️`)
}
*/

/*
// Lecture 47 / Looping arrays
const personArray = [
    'John',
    'Lastname',
    2023 - 2000,
    'teacher', 
    ['Michael', 'Peter', 'Steven'],
    true,
];

let array = [];

for (let i = 0; i < personArray.length; i++) {
    console.log(personArray[i]);
    array.push(typeof personArray[i]);
    console.log(array[i]);
}

const years = [1991, 2007, 1969, 2020, 2023];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2023 - years[i]);
    console.log(ages);
};

// continue and break
// continue makes the current iteration of the loop finish and the next one starts instantly
console.log('----ONLY STRINGS----')
for (let i = 0; i < personArray.length; i++) {
    if(typeof personArray[i] !== 'string') continue;
    console.log(personArray[i], typeof personArray[i]);
}

console.log('----BREAK WITH NUMBER----')
for (let i = 0; i < personArray.length; i++) {
    console.log(personArray[i], typeof personArray[i]);
    if(typeof personArray[i] === 'number') {
        break;
    } 
    
}
*/

/*
// Lecture 48
const person = [
    'John',
    'Lastname',
    2023 - 2000,
    'teacher', 
    ['Michael', 'Peter', 'Steven'],
    true,
];

for (let i = person.length - 1; i >= 0; i--) {
    console.log(person[i])
}

for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`--- Starting exercise ${exercise} ---`)
    for (let i = 0; i <= 6; i++) {
        console.log(`Rep: ${i} 🏋️‍♂️`)
    }
}
*/

/*
// Lecture 49 / While loop
// for (let rep = 1; rep <= 3; rep++) {
//     console.log(`Lifgting weights repetition ${rep} 🏋️‍♂️`);
// }

let rep = 1;
while (rep <= 3) {
    console.log(`Lifgting weights repetition ${rep} 🏋️‍♂️`);
    rep++;
};

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('Loop is about to end...');
}
*/