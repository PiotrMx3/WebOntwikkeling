import * as rl from "readline-sync";
import * as slot from "sloth-log";

function repeatWords(word:string, times: number, del:string = " "):void {

    let index : number = Math.round(Math.random()*1);
    const lastSing : string[] = ["!","?"];
    console.log(index);
    let string : string = "";
    for (let i = 0; i < times; i++) {
        string += `${word}${del}`
    }
    string += lastSing[index];


    slot.log(string, { speed: 1000, maxWordsAtOnce: 2 })
    
}



let textUser : string = "";

do {

    let index: number = Math.floor(Math.random() * 8) + 3;
    textUser = rl.question("");

    repeatWords("Meow", index);
} while (textUser.toLowerCase() !== "bye");

export {}