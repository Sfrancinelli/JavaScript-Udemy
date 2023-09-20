'use strict';

const Person = function (firstName, birthYear) {
  console.log(this);
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Instance methods -- Bad practice
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
};

// The constructor functions are always called with the 'new' operator.
// This is necessary because when the function is called with the 'new' operator, a bunch of things happen behind the scenes:
// 1. A new empty object is created
// 2. The function is called and the 'this' keyword is setted to the object that was created on the first point.
// 3. This newly created object is link to a prototype
// 4. The object that was created in the beggining is then automatically returned form the constructor function. The constructor function returns that new object from the beggining. As we add propertys to the object in the constructor, the returned object will of course contain them.
const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('Matilda', 2017);

console.log(jonas instanceof Person); // true
