// import { error } from "console";
// interface Coctail {
//   idDrink: string;
//   strDrink: string;
// }
// async function coctails() {
//   const urlOne: string = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11000";
//   const urlTwo: string = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11001";
//   const urlThree: string = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11002";

import { json } from "stream/consumers";

//   try {

//     const allApi = await Promise.all([fetch(urlOne),fetch(urlTwo),fetch(urlThree)]);
//     const data = await Promise.all(allApi.map(response => response.json()));
  
    
//     console.log(data[0].drinks[0].strDrink);
//     console.log(data[1].drinks[0].strDrink);
//     console.log(data[2].drinks[0].strDrink);

    

//   } catch (error) {
//     console.log(error)
//   }
    
// }

// coctails();
// console.log(data1Ok.drinks[0].strDrink);


interface RootObject {
  drinks: Drink[]
}

interface Drink {
  idDrink: string
  strDrink: string
}


let dranks = async () => {

    try {

      const [data1, data2, data3]: RootObject[] = await Promise.all([
      fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11000").then(r  => r.json()),
      fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11001").then(r  => r.json()),
      fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11002").then(r  => r.json())
    ]);

        const drinkOne: string = data1.drinks[0].strDrink;
        const drinkTwo: string = data2.drinks[0].strDrink;
        const drinkThree: string = data3.drinks[0].strDrink;

        console.log(drinkOne);
        console.log(drinkTwo);
        console.log(drinkThree);


    } catch (error) {
      console.log(error);
    }

}


dranks();