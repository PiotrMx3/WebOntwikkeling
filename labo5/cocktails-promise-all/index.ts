import { error } from "console";
interface Coctail {
  idDrink: string;
  strDrink: string;
}
async function coctails() {
  const urlOne: string = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11000";
  const urlTwo: string = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11001";
  const urlThree: string = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11002";

  try {

    const allApi = await Promise.all([fetch(urlOne),fetch(urlTwo),fetch(urlThree)]);
    const data = await Promise.all(allApi.map(response => response.json()));
  
    
    console.log(data[0].drinks[0].strDrink);
    console.log(data[1].drinks[0].strDrink);
    console.log(data[2].drinks[0].strDrink);

    

  } catch (error) {
    console.log(error)
  }
    
}

coctails();
// console.log(data1Ok.drinks[0].strDrink);


