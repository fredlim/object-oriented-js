'use strict';

// scoop example

console.log('>> Scoop example');

var foo = 1;
var bar = 2;

function myFunc() {
  //-- define local-to-function variables
  var a = 1;
  var b = 2;
  var foo = 3;

  console.log("inside myFunc");
}

console.log("outside");

//-- and then, call it:
myFunc();

// Scoop Objects

console.log('>> Scoop objects');

//function createCounter(counter) {
var createCounter = function (counter) {
  //-- define local-to-function variables
  //var counter = initial;

  //-- define nested functions. Each of them will have
  //   a reference to the current scope object

  /**
   * Increments internal counter by given value.
   * If given value is not a finite number or is less than 1, then 1 is used.
   */
  //function increment(value) {
  let increment = function (value) {
    if (!isFinite(value) || value < 1) {
      value = 1;
    }
    counter += value;
  }

  /**
   * Returns current counter value.
   */
  let get = function () {
    return counter;
  }


  //-- return object containing references
  //   to nested functions
  return {
    increment: increment,
    get: get
  };
}

//-- create counter object
var myCounter1 = createCounter(100);
var myCounter2 = createCounter(200);

var a, b;
a = myCounter1.get();
b = myCounter2.get();

myCounter1.increment(1);
myCounter1.increment(2);

myCounter2.increment(5);

a = myCounter1.get();
b = myCounter2.get();

console.log(a);
console.log(b);

// Usage of 'this' in nested functions

console.log('>> Usage of "this" in nested functions');

var myObj = {
 
  myProp: "outer-value",
  createInnerObj: function() {
    //var parent = this;
    var hidden = "value-in-closure";
 
    return {
      myProp: "inner-value",
      innerFunc: function() {
        return "hidden: '" + hidden + "', myProp: '" + this.myProp + "'";
        //return "hidden: '" + hidden + "', myProp: '" + parent.myProp + "'";
      }
    };
 
  }
};
 
var myInnerObj = myObj.createInnerObj();

var fakeObject = {
  myProp: "fake-inner-value",
  innerFunc: myInnerObj.innerFunc
};

var moreFakeObject = {
  myProp: "more-fake-inner-value"
};

console.log( myInnerObj.innerFunc() );
console.log( fakeObject.innerFunc() );
console.log( myInnerObj.innerFunc.call(moreFakeObject) );

//// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
//// Closure

function makeFunc() {
  const name = 'Mozilla';
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const runFunc = makeFunc();
runFunc();

///

function makeAdder(x) {
  let a = 0;
  return function (y) {
    a += y;
    return x + y + a;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 9
console.log(add10(3)); // 16

//// Emulating private methods with closures

const makeCounter = function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment() {
      changeBy(1);
    },

    decrement() {
      changeBy(-1);
    },

    value() {
      return privateCounter;
    },
  };
};

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1.value()); // 0

counter1.increment();
counter1.increment();
console.log(counter1.value()); // 2

counter1.decrement();
console.log(counter1.value()); // 1
console.log(counter2.value()); // 0

//console.log(counter1.privateCounter); // undefined
//console.log(counter1.changeBy(1)); // Uncaught ReferenceError

//// Closure scoop chain

const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

const sum1 = sum(1);
const sum2 = sum1(2);
const sum3 = sum2(3);
const result = sum3(4);
console.log(result);

//

function outer() {
  const x = 5;
  if (Math.random() > 0.5) {
    const y = 6;
    return () => console.log(x, y);
  }
}

//outer()(); // logs 5 6
const outer1 = outer();
outer1();