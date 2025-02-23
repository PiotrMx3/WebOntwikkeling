import express, { Express } from "express";
import dotenv from "dotenv";
import { format } from "path";
import { name } from "ejs";
import { ppid } from "process";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("port", process.env.PORT || 3000);

interface Platforms {
    windows: boolean;
    mac: boolean;
    linux: boolean
}

interface SteamGame {
    releaseYear: number;
    minimumAge: number;
    name: string;
    description: string;
    image: string;
    developer: string;
    platforms: Platforms
}

let games: SteamGame[] = [];


app.get("/", (req, res) => {
    
    const formatted : SteamGame[] = [...games];

    const field = req.query.sortField || "name";
    const order = req.query.sortDirection || "asc";

    if(field === "name") {
        formatted.sort((a , b) => {
           return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name) ;
        });
    } 
    else if (field === "releaseYear") {
        formatted.sort((a, b) => {
            return order === "asc" ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear; 
        });
    }
    else if (field === "minimumAge") {
        formatted.sort((a, b) => {
            return order === "asc" ? a.minimumAge - b.minimumAge : b.minimumAge - a.minimumAge; 
        });
    }
    else if (field === "developer") {
        formatted.sort((a , b) => {
            return order === "asc" ? a.developer.localeCompare(b.developer) : b.developer.localeCompare(a.developer) ;
         });
    }


    res.render("games", {
        games: formatted,
        field: field,
        order: order        
    });
    
});

app.post("/games", (req, res) => {
    console.log(req.body); 
    res.json({ message: "Game received!", data: req.body });
});



app.listen(app.get("port"), async() => {
    let response = await fetch("https://raw.githubusercontent.com/similonap/json/master/steam.json")
    games = await response.json();
    console.log("Server started on http://localhost:" + app.get('port'));
});