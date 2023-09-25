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

////7777777777777777/////7//////////////////////////////////////
// CODING CHALLENGE #1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 110);
const mercedes = new Car('Mercedes', 100);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.break();
bmw.break();
bmw.break();
bmw.break();
bmw.break();

mercedes.break();
mercedes.break();
mercedes.break();
mercedes.break();

/////////////////////////////////////////////////////////////7
// ES6 Classes (is the same as above but with a syntethic sugar syntax for people coming from other programming languages)

// class expression
// const Student = class {}

// class declaration
class Student {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // The methods that we declare here will be added to the prototype of the object, same as before. This is only a 'nicer' syntax to do exactly de same
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists (in this case the setter is there for validation purposes)
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) {
      // The property is created with an underscore in order to avoid an error caused by the constructor and a setter trying to create the same property.
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    // This getter is created to return a value for the "property" fullName althought the property itself doesnt exists, the name is _fullName
    return this._fullName;
  }

  // To create an static method with ES6 classes, its only needed to use the "static" keyword
  static heyThere() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new Student('Jessica Davis', 1996);
console.log(jessica);
console.log(jessica.__proto__);
console.log(jessica.__proto__ === Student.prototype); // true
jessica.calcAge();
console.log(jessica.age);

const walter = new Student('Walter White', 1965);
console.log(walter);

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode event if the document wasnt

/////////////////////////////////////////////////////////////
// Getters and setters

const accounts = {
  owner: 'jonas',
  movements: [200, 520, 120, 300],

  // To create a getter the only thing to do is prepend the "get" keyword before the method
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // To create a setter the only thing to do is prepend the "set" keyword before the method
  set latest(mov) {
    this.movements.push(mov);
  },
};

// The getter is "called" like a property, and it shows the return value
console.log(accounts.latest);

// Calling the setter
accounts.latest = 50;
console.log(accounts.movements, accounts.latest);

// To add static methods: (like Number.parseFloat, Array.from, etc)
Student.hey = function () {
  console.log('Hey there 👋');
};

Student.hey();
// This "hey" method will not be inherited by the instances because is an static method from the class itself and NOT in the prototype
Student.heyThere();

///////////////////////////////////////////////////////////////////
// Different way of creating classes than constructor functions and ES6 classes.
// Object.create

// Its important to create the prototype for the Person class as an object literal:
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  calcActualAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Create the person object with the PersonProto as the prototype linked
const steven = Object.create(PersonProto);
console.log(steven.__proto__);
(steven.name = 'Steven'), (steven.birthYear = 2002);

steven.calcActualAge();

// Editing objects programatically and not like above
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);

////////////////////////////////////////////////////////////////////7
// CODING CHALLENGE #2
class Car2 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }
  break() {
    this.speed -= 5;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car2('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.speedUS = 50; // m/h
console.log(ford); // 80 km/h
