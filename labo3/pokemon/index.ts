import { Console } from "console";
import { addAbortListener } from "events";
import * as rl from "readline-sync";

let pokemon: string[] = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
];

let team : string[] = [];


for (let i = 0; i < pokemon.length; i++) {
 console.log(`${i}. ${pokemon[i]}`);   
}


while (true) {

  const addToPokeTeam : string = rl.question("Welke pokemon wil je in je team? [0-20]: ")
  
  if(addToPokeTeam.toUpperCase() === "STOP"){
    break;
  }

 const index : number = parseInt(addToPokeTeam);
 
 if(isNaN(index) || index < 0 || index > pokemon.length - 1) {
    console.log("deze pokemon ken ik niet !")
 }

 else {
    if(team.includes(pokemon[index])){
        console.log(`Pokemon ${pokemon[index]} zit al in jouw team !`)
    }
    else {
        team.push(pokemon[index])
        console.log(`Pokemon ${pokemon[index]} is toegevoedt aan jouw team !`)
    }
 }
}

console.log("Jouw pokemon team is: ")

for (let i = 0; i < team.length; i++) {
    console.log(`${i + 1}. ${team[i]}`);   
   }