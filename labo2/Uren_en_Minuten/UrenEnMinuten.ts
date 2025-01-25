import * as rl  from "readline-sync";

const minuten : number = rl.questionInt("Geef het aantal minuten in: ")
const hours : number = Math.floor(minuten / 60);
const remainingMinutes : string = (minuten % 60).toFixed(0);

console.log(`Dit is ${hours} uur en ${remainingMinutes} min`)