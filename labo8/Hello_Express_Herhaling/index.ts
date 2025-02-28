import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";
import { get } from "http";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

const ikke = {
    name: "Piotr",
    age: 29,
    profilepic: "./images/ikke.png"
};

app.get("/", (req, res) => {
res.type("text/html");
res.send("<h1>Mijn Apliccatie !</h1> <p> Paraf Hello ! </p>");
});


app.get("/whoami", (req,res) => {
res.type("text/html");
res.send(` 
<!DOCTYPE html>
<html lang="nl-be">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p> Mijn naam is ${ikke.name} en ik ben ${ikke.age} jaar oud </p>
    <img src="${ikke.profilepic}" alt="ikke">
</body>
</html> `);
});

app.get("/whoamijson", (req,res) => {
    res.json(ikke);
});


app.get("/pikachujson" , async (req,res) => {

const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
const pikachu = await response.json();
res.json(pikachu);

});


app.get("/pikachuhtml", async (req,res) => {
    
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pikachu = await response.json();
    


});


app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});