import * as rl from "readline-sync";


let isRuinning : boolean = true;

while(isRuinning) {

    let email : string = rl.questionEMail("Geef het email adres in: ",{limitMessage:("Email is niet correct ! probeer op het nieuw !")});
    email = email.substring(0,email.indexOf("@"));
    
    let name : string = email[0].toUpperCase() + ".";
    let surName : string = email.substring(email.indexOf(".") + 1);
    surName = surName[0].toUpperCase() + surName.substring(1);

    console.log(`De naam is ${name} ${surName}`)

    isRuinning = rl.keyInYNStrict("Wil jij nog een email adres ingeven? ");

}

console.log("See you !")





