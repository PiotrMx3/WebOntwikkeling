import * as cowsay from "cowsay";
import * as rl from "readline-sync";
import { IOptions } from "cowsay" // optional
import { error } from "console";

function say(userText: string): void {
    
    // if(userText !== "Moo")  throw new Error("Cow's don't say that! ");
         

    let opts: IOptions = {
        text: `${userText} !`,
        e: 'oO',
        T: 'U',
        r: true,
    };

  console.log(cowsay.say(opts));
}


do {
    let userText : string = rl.question("What you want say? ");
    
    if (userText.toLowerCase() === "exit") {
        break;
    }
    else {
        try {
            console.log("");
            say(userText);
            
        } catch (error : any) {
            console.log(`${error.message}`)
        }
    }

} while (true);














export {}