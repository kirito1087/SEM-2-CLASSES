// //String
// let str = "  Hello , I am Krishna  ";

// console.log(str.length); //for length

// console.log(str.charAt(8)); //Character at that index

// console.log(str.charCodeAt(8)); //ASCII CODE

// console.log(str.substring(4)); //All Chars after index 4

// console.log(str.substring(4, 10)); //print all chars from index 4 to 10-1;

// console.log(str.substring(10, 4)); //will give the same output as above because the indices would be swapped before applying the substring function

// console.log(str.substring(-10)); //print from 0 to end of the string(-ve --> 0)

// //slice function 
// let str1 = str.slice(10); // Print all the char after 10
// console.log(str1);

// //start < end
// let sl1 = str.slice(10, 14);
// console.log(sl1);

// //start > end
// let sl2 = str.slice(14, 10);
// console.log(sl2); // print empty string

// //-ve index
// let sl3 = str.slice(-100);

// console.log(sl3); //Print all char from the end or right of the string

// console.log(str.toLowerCase()); //print all char in lowercase

// console.log(str.toUpperCase()); //print all char in upppercase

// console.log(str.trim()); //remove the spaces from start and end

// console .log(str.includes("Krishna")); //search the given sunstring and return boolean and it's case sensitive

//EXERCISE

// let str = " Learn JavaScript Functions Arrow IIFE ";

// console.log(str.trim());

// console.log(str.length);

// console.log(str.toUpperCase());

// console.log(str.substring(7, 17));

// console.log(str.slice(7, 17));

// console.log(str.includes("functions"));

// console.log(str.includes("arrow"));

// console.log(str.includes("iife"));

// console.log(str.charAt(6));

// console.log(str.charCodeAt(6));

// let str2 = str.toLowerCase();

// console.log(str2.includes("javascript"));

//Slice 
// let arr = [1,2,3,4,5,6,7,8];
// console.log(arr);

// //Another way to create an array
// let arr2 = new Array(10,20,30,40);
// console.log(arr2);

// //To get a part of an Array
// let subArr = arr.slice(2,6); //Return a sliced array
// console.log(subArr);

// //Splice --> Remove the elements 
// arr.splice(2,3); //Remove three elements from index 2
// console.log("Spliced arr:", arr);

// //Remove and Add elements splice 
// //(StartIndex, NoOfEle, Ele1, Ele2, Ele3.......,Elen)
// arr.splice(2,2,10,20,30,40);