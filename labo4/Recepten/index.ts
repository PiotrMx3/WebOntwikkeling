import { Console } from "console";
import * as rl from"readline-sync";
import { Recoverable } from "repl";

interface Recept {
    name: string;
    description: string;
    peoples: number;
    ingredients: Ingredient[];
}

interface Ingredient {
    name: string;
    amount: string;
    price: number;
}



const spaghetti : Recept = {
    name: "Spaghetti",
    description: "Yummi Spaghetti",
    peoples: 4,
    ingredients: [
        {name: "500g gehakt",amount: "0.5kg", price: 5},
        {name: "Passata",amount: "1st", price: 3},
        {name: "Paste",amount: "1st", price: 10},
        {name: "Spek",amount: "5st", price: 15}]
};

for (const [key,value] of Object.entries(spaghetti)) {

    if(key === "ingredients") {
        console.log("Ingedrients:")
        spaghetti[key].forEach((e,index) => {
            console.log(`${index + 1}. ${e.name} - ${e.amount}, ${e.price} euro`)
        });
    }
    else {
        console.log(`${key}: ${value}`)
    }   
        
};

let total: number = spaghetti.ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

console.log(`Totale prijs is: ${total} euro`);


