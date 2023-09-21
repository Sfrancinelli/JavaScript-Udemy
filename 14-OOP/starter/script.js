'use strict';

const Person = function (firstName, birthYear) {
  console.log(this);
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Instance methods -- Bad practice
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
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

////////////////////////////////////////////////////////////
// Prototypes
// Each and every function in JavaScript has a property called prototype and that includes of course, constructor functions. Every object that's created by a certain constructor function will get access to all the methods and properties on the constructor prototype properties.

console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Because we set the method on the prototype of this constructor function, the instances created of that function will inherit said methods.
jonas.calcAge();
matilda.calcAge();

// Deprecated __proto__
console.log(jonas.__proto__);

// Check the prototype with this function:
console.log(Object.getPrototypeOf(jonas));

// Checking that te protoype of person is the prototype of its 'instances'
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// Its also possible to set properties and not only methods using the prototype:
Person.prototype.species = 'Homo Sapiens';

console.log(jonas.species, '-----', matilda.species);

// Al the properties inhereted from the prototype are not actually properties of the object. To check said statement:
console.log(jonas.hasOwnProperty('firstName')); // true (because the constructor function creates this property on the object)
console.log(jonas.hasOwnProperty('species')); // false

// Prototype of Person is === to Object.__proto__
console.log(Object.getPrototypeOf(Person) === Object.__proto__); // True

// Prototype of Person
console.log(jonas.__proto__);

// Prototype of Object
console.log(jonas.__proto__.__proto__);

// This is null because the prototype of Object is the top of the prototypal chain.
console.log(jonas.__proto__.__proto__.__proto__); // null

console.log(Person.prototype.constructor);

/////////////////////////////////////////////////
// Prototype of arrays
const arr = [3, 4, 5, 6, 7, 8, 3, 8, 6, 3, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

// Getting again to the Object.prototype
console.log(arr.__proto__.__proto__);

// Creating a new method for ALL the arrays in our code. The method its created on the prototype of the Array constructor and that means that every array created will inherit said method.
Array.prototype.unique = function () {
  // The this keyword is the array
  return [...new Set(this)];
};
// However... Extending the properties and methods of built in prototypes is a bad practice.
// 1. Future versions of JS might add a method with the same name but different functions and then the code will do completely different things or break.
// 2. This is also bad for team working. If every developer on a team proceeds to add methods on the prototype of built in objects, it can lead to serious bugs if there's no proper communication.

// Using the method on the created array
console.log(arr.unique());
