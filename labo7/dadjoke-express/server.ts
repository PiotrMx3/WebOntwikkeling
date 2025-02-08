import { log } from "console";
import express, { application } from "express";

// try {
//     const response = await fetch('https://icanhazdadjoke.com/', {
//     headers: { Accept: 'application/json' },
//     });

//     if(!response.ok) throw new Error("Error not posibble to fetch data");
//     joke = await response.json();
    
// } catch (error : any) {
//     console.log("Error: " + error.message);
// }
const app = express();

app.set("port",3000);

interface JokeDad {
 id: string;
 joke: string;
 status: number;   
}

async function fetchDadJoke(): Promise<JokeDad> {

    const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
    });

    const data : JokeDad = await response.json();
    return data;
}

app.get("/", (req,res) => {
res.type("text/html");
res.send("<h1>Hellow My Friends </h1>");
});

app.get("/joke/json", async (req,res) => {
    const joke = await fetchDadJoke();

    res.type("application/json");
    res.json({
      jokeId: joke.id,
      jokeJoke: joke.joke,
      jokeStatus: joke.status  
    });
});


app.get("/joke/html", async (req,res) => {

    const joke = await fetchDadJoke();

    res.type("text/html");
    res.send(`
        <!DOCTYPE html>
        <html lang="nl-be">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DadJoke</title>
        </head>
        <body>
        <h1>${joke.joke}</h1>
        </body>
        </html>
        `);
    });
    
    
    app.listen(app.get("port"), async () => {
        console.log("[Server is running at] http://localhost:" + app.get("port"));
    });
    