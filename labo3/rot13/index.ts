import * as rl from "readline-sync";

const alphabet : string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
    'u', 'v', 'w', 'x', 'y', 'z'
  ];


  const userString : string = rl.question("Enter a string: ");

let encryption : string = "";


for (let i = 0; i < userString.length; i++) {

    const letter : string = userString[i];
    
    if(alphabet.includes(letter)) {
        const newIndex : number = (alphabet.indexOf(letter) + 13) % 26;
        encryption += alphabet[newIndex];

    }
    else if (alphabet.includes(letter.toLowerCase())){
        const newIndex : number = (alphabet.indexOf(letter.toLowerCase()) + 13) % 26;
        encryption += alphabet[newIndex].toUpperCase();
    }
    else {
        encryption += letter;
    }

}

console.log(encryption);