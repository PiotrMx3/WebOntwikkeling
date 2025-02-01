import * as rl from "readline-sync";

interface RootObject {
    drinks: Drinks[];
}

interface Drinks {
    idDrink: string;
    strDrink: string;
}

async function lookupCoctails() {
    const border : string = "-------------------------------------------"
    const welcomeText : string = "| Welcome to the cocktail lookup service. |"
    
    console.log(border);
    console.log(welcomeText);
    console.log(border);
    let ingedrient : string = ""; 

  do {
    
      ingedrient = rl.question("Please provide an ingredient: ").trim();
      if(ingedrient === "") break; 
      
      const url : string = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ingedrient}`;

      try {

        const response = await fetch(url);
        if(!response.ok) throw new Error("Error: " + response.status);
        const data : RootObject = await response.json();
        const dataDrinks : Drinks[] | null = data.drinks;

        if(dataDrinks === null) throw new Error(`There are no coctails with ${ingedrient} as ingredient !`);
        console.log(`Cocktails with ${ingedrient}:`)
        console.log("");
        dataDrinks.forEach(e => console.log(e.strDrink));

      } catch (error : any) {
        console.log("Error: " + error.message);  
      }
      console.log("");
  } while (true);

}

lookupCoctails();

export {}