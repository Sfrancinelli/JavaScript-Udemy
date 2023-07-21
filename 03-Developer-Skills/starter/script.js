"use strict";

// PROBLEM:
// We work for a company building a smart home thermometer. Our most recent taks is this: "Given an array of temperatures of one day, calculate the temperature amplitud. Keem in mind that sometimes there might be a sensor error".
/*
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

function tempAmplitud(arr) {
    let greaterValue = temperatures[0];
    let lesserValue = temperatures[0]; 
    for (let i = 0; i <= arr.length; i++) {
        if (typeof arr[i] !== 'number') {
            arr.splice(i, 1);
        } else if (typeof arr[i] === 'number') {
               console.log(arr[i]);
            if (arr[i] > greaterValue) {
                greaterValue = arr[i];
            } else if (arr[i] < lesserValue) {
                lesserValue = arr[i];
            }
        }
        }

    let amplitud = greaterValue - lesserValue;
    console.log('------------------------------')  
    console.log(lesserValue, greaterValue)
    console.log(amplitud)
    return amplitud
}

tempAmplitud(temperatures)

console.log('---------------------------------')

const measureKelvin = function () {
    const measurement = {
        type: 'temp',
        unit: 'celsius',
        value: prompt('Degrees celsius:'),
    };

    console.table(measurement);

    const kelvin = Number(measurement.value) + 273;
    return kelvin;
}

console.log(measureKelvin());

// Optimizing the amplitud calculator:
const calcTempAmplitude = function(t1,t2) {
    const temps = t1.concat(t2);
    
    let max = temps[0];
    let min = temps[0];

    for (let i = 0; i < temps.length; i++) {
        const currentTemp = temps[i];
        if (typeof currentTemp !== 'number') continue;

        if (currentTemp > max) max = currentTemp;
        if (currentTemp < min) min = currentTemp;
    }
    console.log(max, min);
    return max - min;
};
const amplitude = calcTempAmplitude([3, 5, 1], [9, 0, 5]);
*/

// Exercise #1:
/* 
Given an array of forecasted maximun temperaturesm the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17°C in 1 days ... 21°C in 2 days ... 23°C in 3 days ..."

Create a function 'printForecast' which takes in an array and logs a string like the above to the console.

TEST DATA 1: [17,21,23]
TEST DATA 2: [12,5,-5,0,4]
*/

const printForecast = function (arr) {
  let sentence = "... ";
  for (let i = 0; i < arr.length; i++) {
    sentence += `${arr[i]}°C in ${i + 1} days ... `;
  }
  return sentence;
};

console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
