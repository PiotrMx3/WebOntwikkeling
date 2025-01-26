import { Console } from "console";
import * as rl from "readline-sync";

let numberArray : number[] = [];
let amoutOfNumber : number = rl.questionInt("Hoeveel getallen wil je optellen? ", {limitMessage:"Geef een gehel getal in !"});

for (let i = 0; i < amoutOfNumber; i++) {
    
    let numberToSave : number = rl.questionInt(`Geef getal ${i + 1} in : `)
    numberArray.push(numberToSave);
}

let result : number = numberArray.reduce((a : number, b : number) => a + b , 0);

console.log(`De som van de getallen is ${result}`);


