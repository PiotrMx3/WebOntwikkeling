import * as rl from "readline-sync";

let userAmount : number = rl.questionInt("Hoeveel getallen wil je optellen? ");

let usersNumber : number[] = [];

for (let i = 0; i < userAmount; i++) {

    usersNumber.push(rl.questionInt(`Geef getaal ${i + 1} in: `));
}

let sum : number = 0;

usersNumber.forEach(el => sum += el);

console.log(sum);


