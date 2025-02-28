import express, { Express} from "express";
import { Person, Pokemon } from "./types";

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");


const thisisme : Person = {
    name: "Andie Similon",
    age: 39,
    profilePic: "https://raw.githubusercontent.com/similonap/images/main/thisisme.png"
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

app.set("port", 3000);

app.get("/", (req, res) => {
res.render("index");
});

app.get("/whoami", (req, res) => {
res.render("whoami", {
    thisisme: thisisme
});
});

app.get("/whoamijson", (req, res) => {
    res.type("application/json");
    res.json(thisisme);
});

app.get("/pikachujson", async(req, res) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pikachu : Pokemon = await response.json();

    res.json({
        id: pikachu.id,
        name: pikachu.name,
        weight: pikachu.weight,
        frontImage: pikachu.sprites.front_default,
        backImage: pikachu.sprites.back_default
    });
});

app.get("/pikachuhtml", async(req, res) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pikachu : Pokemon = await response.json();

    const html = `
    <html>
        <head><title>${pikachu.name}</title></head>
        <body>
            <h1>${pikachu.name}</h1>
            <p>ID: ${pikachu.id}</p>
            <p>Weight: ${pikachu.weight}</p>
            <img src="${pikachu.sprites.front_default}"/>
            <img src="${pikachu.sprites.back_default}"/>
        </body>
    </html>`;

    res.type("text/html");
    res.send(html);
});

app.get("/randomcolor", (req, res) => {
    const color = getRandomColor();
    let html : string = `
    <html>
        <head><title>Random Color</title></head>
        <body style="background-color:${color}; display: flex; justify-content: center; align-items: center; height: 100vh;">
            <h1>${color}</h1>
        </body>
    </html>
    `
    res.type("text/html");
    res.send(html);
});

app.use((req, res) => {
    let html : string =`
    <html>
        <head><title>404 - Not Found</title></head>
        <body>
            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </body>
    </html>
    `
    res.type("text/html");
    res.status(404);
    res.send(html);
    }
);


app.listen(app.get("port"), () => {
    console.log("Server started listening on port " + app.get("port"));
});