// //Function declaration

// //1.Using Arguments
// function greet(a){
//     console.log("Hello", arguments)
// }
// greet(1,2,3,4,"ABC",true,11);

// //for size
// function NoOfArg(){
//     console.log(arguments.length)
// }
// NoOfArg(1,2,3,4,5);

// //2.Using rest operator

// function findArg(...arg){
//     //print all arguments
//     console.log(arg)
// }
// findArg(1,2,3)

// function findArg(a,b,...arg){
//     //print all arguments
//     console.log(a,b,arg)
// }
// findArg(1,2,3,4,5,"apple")

//Simple Order Pricing module

// const price = 500;
// const quantity = 20
// const discount = 50;
// const tax = 18
//  function order(a){
//     if(quantity >= 10){
//        const payable = (price - discount) + tax;
//     }
//  }


// //this keyword

// const x = {
//     name: "Ash Ketcham",
//     role: "Js Developer",
//     exp: 30,
//     show: function(){
//         console.log("This inside method", this);
//         //const that = this;

//         setTimeout(() => {
//             console.log("this inside a function", this);
//             console.log("Hi I am ", this.name);

//             const sum = () => {

//             }
//         })
//     }

// }



// //Nested function
// let a = 10;
// console.log(a);
// function outer(){
//     console.log("outer called")
//     console.log(a);

//     function inner(){
//         console.log("inner called");
//         console.log(a);
//         let b = 100;
//     }
//     inner();
// }
// outer();


//Nested ques

let x = 10;
function outer(){
    let x = 20;

    function inner(){
        console.log(x);
    }
    inner();
}
outer();