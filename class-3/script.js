//-----Synchronous code------


// console.log("Before");

// function fun(){
//     console.log("I am fun");
// }
// fun();

// console.log("After");


//-----Asynchronous code------

// console.log("Before");

// function fun(){
//     console.log("I am fun");
// }
// setTimeout(fun,0);   //delegated to browser through Web APIs

// console.log("After");
// console.log("After");
// //GEC will be released and JS Callstack is free.


//---------------async--------------


// console.log("Before");

// let flag = true;
// function fun(){
//     console.log("loop break");
//     flag = false;
// }
// setTimeout(fun, 2000);

// console.log("After");
// console.log("Next");

// while (flag) {} //Infinite loop

//------------Quiz1---------------

// console.log("Before");
// const fun2 = () => {
//     console.log("Set Timeout 1");
//     let timeInFuture = Date.now() + 7000;

//     while(Date.now() < timeInFuture){}
//     console.log("after while");
// };
// const fun1 = () => console.log("Hello");
// setTimeout(fun1, 2000);
// setTimeout(fun2, 1000);

// console.log("After");


//----------------Quiz2----------------

// console.log("Start");
// setTimeout(() => {
//     console.log("First Timeout(1s)");
//     setTimeout(() => {
//         console.log("Inner Timeout(0.5s)");
//     }, 500);
// }, 1000);
// setTimeout(() => {
//     console.log("Second timeout(0s)");
// }, 0);
// function runTask(){
//     console.log("Inside run Task");
//     setTimeout(() => {
//         console.log("Timeout inside runTask(300ms)");
//     }, 300);
// function innerTask(){
//     console.log("Inside InnerTask");
// }
// innerTask();
// }
// runTask();