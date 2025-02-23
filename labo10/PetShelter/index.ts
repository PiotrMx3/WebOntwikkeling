import express, { Express, response } from "express";
import dotenv from "dotenv";
import path from "path";
import { read } from "fs";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);


interface Animal {
    name: string,
    value:string
}

const animals: Animal[] = 
[
    {name: "Dog" , value: "dog"},
    {name: "Cat" , value: "cat"},
    {name: "Rabbit" , value: "rabbit"},
]



app.get("/", (req, res) => {
    res.render("index", {
        title: "First Post req",
        message: "Welcome To Random Animal Generator!",
        animal:animals
    })
});

app.post("/", (req, res) => {
    const name = req.body.name;
    const animal = req.body.sortAnimal;
    const number = Math.floor(Math.random() * 5) + 1;

res.render("response", {
    title: "First Post req",
    message: animal,
    userName: name,
    choiceAnimal: animal,
    nrAnimal: number
});
});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});