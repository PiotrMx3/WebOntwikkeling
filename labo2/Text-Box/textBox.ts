import * as rl from "readline-sync";

let tekst : string;

while (true) {
    
    tekst = rl.question("Geef tekst in: ");

    if(tekst === "") break;
    
        let border : string = "+" + "-".repeat(tekst.length + 2) + "+";
        tekst = "|" + " " + tekst + " " + "|";
    
        console.log(border);
        console.log(tekst);
        console.log(border);

}

console.log("See you !")



