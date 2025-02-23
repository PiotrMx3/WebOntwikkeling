import { clear, error } from "console";
import { url } from "inspector";
import * as rl from "readline-sync";

// interface RootobjectCat {
//         error: boolean;
//         categories: string[];
//     }

// interface SingleJoke {
//     error: boolean;
//     category: string;
//     type: "single";
//     joke: string;
// }    

// interface TwopartJoke {
//     error: boolean;
//     category: string;
//     type: "twopart";
//     setup: string;
//     delivery: string;
// }


// type JokeResponse = SingleJoke | TwopartJoke;


//     // https://v2.jokeapi.dev/joke/Dark?type=twopart

//     async function jokeApi() {
        
//         try {
            
//             let isRuning: boolean = true;
//             do {

//                 const urlCat : string = "https://v2.jokeapi.dev/categories";
//                 const type :string[] = ["single","twopart"];
                
//                 const response = await fetch(urlCat);
                
//                 if(!response.ok) throw new Error("Error" + response.status);
                
//                 const data: RootobjectCat = await response.json();
                
//                 const userChoice: number = rl.keyInSelect(data.categories,"What category of joke do you want to see? ", {cancel:false});
//                 const userCat: string = data.categories[userChoice];
                
//                 const userType: number = rl.keyInSelect(type,"What type of joke do you want to see? ", {cancel:false}); 
//                 const urlJoke : string = `https://v2.jokeapi.dev/joke/${userCat}?type=${type[userType]}`;
                
//                 const responseJoke = await fetch(urlJoke);
                
//               if(!responseJoke.ok) throw new Error("Error" + responseJoke.status);
             
//               const dataJoke:JokeResponse = await responseJoke.json();
              
//               console.log("");
//               if(dataJoke.type === "twopart"){
                  
//                   console.log(dataJoke.setup + "\n" + dataJoke.delivery);
//                 } 
//                 else {
                    
//                     console.log(dataJoke.joke);
//                 }
//                 console.log("");
//                 isRuning = rl.keyInYNStrict("Do you want to see another joke? ")
//             } while (isRuning);
                
//             } catch (error:any) {
//                 console.log("Error: " + error.message)
//             }
//         }

//     jokeApi();

interface RootObject {
    error: boolean;
    categories: string[]
}

interface Joke {
    error: boolean,
    category: string,
    type: string,
    joke?: string,
    setup?: string
    delivery?: string
}

const jokeType: string[] = 
[
    "single", "twopart"
];

async function apiJoke() {
let isRunning = true;

while (isRunning) {
    
    try {
        const root: RootObject = await fetch("https://v2.jokeapi.dev/categories").then(r => r.json());
    
        const indexCategorieUser = rl.keyInSelect(root.categories,"What category of joke do you want to see? ", {cancel: false});
        const categorieUser = root.categories[indexCategorieUser];
    
        const indexTypeeUser = rl.keyInSelect(jokeType,"What type of joke do you want to see ? ", {cancel: false});
        const typeUser = jokeType[indexTypeeUser];
    
        const joke : Joke = await fetch(`https://v2.jokeapi.dev/joke/${categorieUser}?type=${typeUser}`).then(r => r.json());

        typeUser === "single" ? console.log(`\n\n${joke.joke}\n\n`) : console.log(`\n\n${joke.setup}\n${joke.delivery}\n\n`);
        
    } catch (error) {
        if(error instanceof Error)
        console.log(error.message);
    }

    isRunning = rl.keyInYNStrict("Do you want more Jokes.? ");
}

};

apiJoke();



export {}