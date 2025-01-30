function add(a:number,b:number): number {
    return a + b;
}

function substract(a:number, b:number): number {
    return a - b;
}

function multiply(a:number, b:number): number {
    return a * b;
}

function divide(a:number, b:number): number {
    return a / b;    
}


let addArrow = (a:number,b:number): number => a + b;
let substractArrow = (a:number,b:number): number => a - b;
let multiplyArrow = (a:number,b:number): number => a * b;
let divideArrow = (a:number,b:number): number => a / b;


const resultat : number = divideArrow(multiply(add(4,5),substractArrow(6,3)),2);

console.log(resultat);

