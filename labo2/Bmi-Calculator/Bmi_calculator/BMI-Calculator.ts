import * as rl from 'readline-sync'

const weight : number = rl.questionFloat("Geef je gewicht in (in kg): ");
const height : number = rl.questionFloat("Geef je lengte in (in m): ");

const result : number = weight / (height * height);
const bmi : string = result.toFixed(2);

console.log(`Je BMI is: ${bmi}`)