import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {
  findAllFromTeam,
  findOne,
  initDb,
  insertIntoTeam,
  pokemonArray,
} from "./database";
import {TeamPokemon} from "./types";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", async (req, res) => {
  const pokeTeam = (await findAllFromTeam()).reverse();

  res.render("index", {
    title: "Pokemon Team",
    message: "Hello Poke Trainer",
    pokemons: pokemonArray,
    team: pokeTeam,
    error: false,
  });
});

app.post("/", async (req, res) => {
  const pokemon: TeamPokemon = {
    pokemon: req.body.pokemon,
  };

  const existing = await findOne(pokemon.pokemon);
  const pokeTeam = (await findAllFromTeam()).reverse();

  if (!existing) {
    await insertIntoTeam(pokemon);
    return res.redirect("/");
  }

  res.render("index", {
    title: "Pokemon Team",
    message: "Hello Poke Trainer",
    pokemons: pokemonArray,
    team: pokeTeam,
    error: true,
  });
});

app.listen(app.get("port"), async () => {
  await initDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
