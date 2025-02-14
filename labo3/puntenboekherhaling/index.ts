import * as rl from "readline-sync";

let arrayOfPoints : number[] = []
let counter = 1;
let failed : number = 0;

while (true) {
    
    const point : string  = rl.question(`Geef de punten van student ${counter}: `);
    
    if(point === "") break;
    
    if(parseInt(point) < 10) failed++; 

    arrayOfPoints.push(parseInt(point));
    counter++;
};


const sum : number = arrayOfPoints.reduce((a,b) => a + b);

const average : number = sum / (arrayOfPoints.length);


console.log(`Het gemiddelde van de punten is: ${average.toFixed(0)}`);

failed !== 0 ? console.log(`Het aantal studenten met een onvoldoende is ${failed}`) : console.log(`Er zijn geen studenten met onvoldoende`);



