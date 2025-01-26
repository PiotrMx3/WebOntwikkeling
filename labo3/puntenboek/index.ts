import * as rl from "readline-sync";

const numberArray : number[] = [];

let counter : number = 1;
let examenFailed : number = 0;

while (true) {

    let answer : string | number = rl.question(`Geef de punten van de student ${counter} in: `);

    if(answer === "") {

        break;
    }
    else {
        answer = parseInt(answer);
        numberArray.push(answer);
        if(answer < 10) examenFailed++ ;
    }

    counter++;
    
}

let sum : number = numberArray.reduce((a:number, b:number) => a + b, 0);
let average : number = sum / numberArray.length;

console.log(`Het gemiddelde van de punten is: ${average}`);
console.log(`Het aantal studenten met een onvoldoende is: ${examenFailed}`);





