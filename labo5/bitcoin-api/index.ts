import * as rl from "readline-sync";


interface RootObject {
    bpi: Bpi;
}

interface Bpi {
    USD: Price;
    GBP: Price;
    EUR: Price;
}

interface Price {
    code: string;
    symbol: string;
    rate: string;
    description: string;
    rate_float: number;
}

async function currencyApi() {
    const url : string = "https://api.coindesk.com/v1/bpi/currentprice.json"
    let currency : string | undefined = undefined;

    while (true) {

        currency = rl.question("Welke valuta wil je zien? (EUR,USD,GBP): ")
        
        if(currency === "EUR" || currency === "USD" || currency === "GBP") {
            break;
        }
        else {
            console.log("Deze valuta wordt niet ondersteund !")
        }
    }

    try {

        const response = await fetch(url);
        if(!response.ok) throw new Error("Error:" + response.status);

        const data: RootObject = await response.json();
        console.log(data);

        // console.log(`De huidige prijs van bitcoin is ${data.bpi[currency].rate_float} ${currency}`);

    } catch (error : any) {
        console.log(error.message);
    }

}

currencyApi();


export {}