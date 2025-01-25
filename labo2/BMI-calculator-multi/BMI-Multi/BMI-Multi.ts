import * as rl from "readline-sync";


let amountOfPpl : number = rl.questionInt("Geef het aantal personen in : ", {limitMessage:"Geef een gehel getaal in !"})


for (let i = 0; i < amountOfPpl; i++) {
    
    const name : string =  rl.question(`Geef de naam van persoon ${i + 1}: `)
    const weight : number = rl.questionFloat("Geef je gewicht in (in kg): ");
    const height : number = rl.questionFloat("Geef je lengte in (in m): ");
    
    const result : number = weight / (height * height);
    const bmi : string = result.toFixed(2);
    
    console.log(`${name} heeft BMI van: ${bmi}`)

}

