import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {findAll, findInTeam, initDb, insertPokemon} from "./database";
import {TeamPokemon} from "./types";
import {error} from "console";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

export const pokemonArray: string[] = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
];

app.get("/", async (req, res) => {
  const pokeTeam = await findAll();
  res.render("index", {
    title: "Hello World",
    pokemons: pokemonArray,
    poketeam: pokeTeam,
    error: false,
  });
});

app.post("/", async (req, res) => {
  const {pokemon} = req.body;
  const pokeInsert = pokemon ? {pokemon} : {};

  const inTeam = await findInTeam(pokeInsert.pokemon);

  if (inTeam) {
    return res.render("index", {
      title: "Hello World",
      pokemons: pokemonArray,
      poketeam: await findAll(),
      error: true,
    });
  }

  await insertPokemon(pokeInsert.pokemon);
  res.redirect("/");
});

app.listen(app.get("port"), async () => {
  await initDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
