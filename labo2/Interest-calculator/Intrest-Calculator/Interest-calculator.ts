import * as rl from "readline-sync"


const budget : number = rl.questionInt("Geef het bedraag in: ", {limitMessage:"Geef een gehel getaal in aub !"});
const precentage : number = rl.questionFloat("Geeff het interest precentage in: ", {limitMessage:"Geef een comma getal in aub! "});


const oneYear : number = budget  * ((1 + (precentage/100)));
const twoYear : number = budget  * ((1 + (precentage/100)) ** 2);
const fiveYear : number = budget  * ((1 + (precentage/100)) ** 5);

console.log(`na 1 jaar heb je : ${oneYear.toFixed(2)} euro.`)
console.log(`na 2 jaar heb je : ${twoYear.toFixed(2)} euro.`)
console.log(`na 5 jaar heb je : ${fiveYear.toFixed(2)} euro.`)


