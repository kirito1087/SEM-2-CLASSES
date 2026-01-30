// const cart = ["shirt", "trousers", "shoes", "shades"];

// const promise = createOrder(cart); //async function -- will get orderID

// //print

// //consume

// promise.then(function(orderId){
//     //promise is fulfilled
//     console.log(orderId);
// })

// //Creation of promise / backend side / producer side

// function createOrder(cart){
//     const pr = new Promise(function(resolve,reject){
//         //CreateOrder
//         //Validate the cart (check in stock)
//         //return orderId

//         // Failed-first approach

//         if(!validateCart(cart)){
//             const err = new Error("Cart is invalid");
//             reject(err)
//         }

//         //logic for createOreder

//         const orderId = '1101'

//         if(orderId){
//             setTimeout(function(){
//                 resolve(orderId);
//             },2000)
//         }
//     });

//     return pr;
// }

// function validateCart(){
//     return true;
// }