import * as  rl  from "readline-sync";

// let name = rl.question("Wat is jouw naam ? ");
// let age : number | undefined = undefined;

// do {
    
//     age = Number(rl.question(`${name} wat is jij leeftijd ? `));

//     if(isNaN(age)) {
//         console.log("Geef een leeftijd in aub !")
//     }

// } while (isNaN(age));

// age = rl.questionInt(`${name} wat is jij leeftijd ? `, {limitMessage:"Geef geldige leeftijd in !"});




// console.log(`Dag ${name} jij bent ${age} jaar oud !`)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// let product = rl.question("Wat is de naam van de product? ? ");
// let price : number | undefined = undefined;



// price = rl.questionFloat(`${product} Hoevel kost het ? `, {limitMessage:"Geef geldige leeftijd in !"});




// console.log(`De Gewenste product: ${product} Prijs ${price} euro !`)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// let answer : boolean = rl.keyInYNStrict("Do you like TypeScript ?");

// if(answer) {
//     console.log("Top me too! ")
// } else {
//     console.log("Too BAD !!")
// }


let choice : string[] = ["TypeScript", "JavaScript", "Python", "Java", "C#"];

let index : number = rl.keyInSelect(choice,"What's you favorite programming language");

console.log(`You chose ${choice[index]}`);



