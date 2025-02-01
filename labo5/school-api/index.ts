import * as rl from "readline-sync";

interface ObjectResponse {
    stateProvince: string | null;
    alphaTwoCode: string;
    country: string;
    webPages: string[];
    domains: string[];
    name: string;
}




async function schoolApi() {
    const countrys : string[] = ["France","Netherlands","United Kingdom","Belgium","Luxembourg","Ireland","Spain","Portugal"];
    let running : boolean = true;
    
    do {
    const userChoice: number =  rl.keyInSelect(countrys,"Which country would you like to list its Colleges with high school education degrees? ")
    if(userChoice === -1) break;

    const url : string = `http://universities.hipolabs.com/search?country=${countrys[userChoice]}`;
    
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error("Error: " + response.status);
        const data : ObjectResponse[] = await response.json();

        console.log(`Coleges in ${countrys[userChoice]}: `);
        
        data.forEach(el=> {
           console.log(el.name);
        });
        
    } catch (error : any) {
        console.log("Error: " + error.message);
    }

    console.log("");

    running = rl.keyInYNStrict("Do you want see one more country? ")

    } while (running);
    
}

schoolApi();


