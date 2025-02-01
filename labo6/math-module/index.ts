import {add, subtract, multiply, divide} from "./math";

console.log(add(2,2));
console.log(subtract(17,5));
console.log(multiply(4,4));

try {  
    console.log(Number(divide(8,0).toFixed(0)));
} catch (error : any) {
    console.log(error.message);
}


export {}