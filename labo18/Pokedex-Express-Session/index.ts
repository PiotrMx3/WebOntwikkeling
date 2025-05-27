import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {
  connect,
  createPlayer,
  getPlayer,
  getPlayers,
  getPokemon,
  getPokemonById,
  savePlayer,
} from "./database";
import {Player, Pokemon} from "./types";
import session from "./session";
import {fn_AuthoSession} from "./middleware/autho";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);
app.use(session);

app.get("/", async (req, res) => {
  let players: Player[] = await getPlayers();
  res.render("index", {
    players: players,
  });
});

app.post("/createPlayer", async (req, res) => {
  let player: Player = {
    name: req.body.name,
    pokemon: [],
  };
  await createPlayer(player);

  res.redirect("/");
});

app.get("/login/:id", async (req, res) => {
  let player: Player | null = await getPlayer(req.params.id);

  if (player) {
    req.session.player = player;
    res.redirect("/menu");
  } else {
    res.status(404).send("Player not found").end();
  }
});

app.get("/menu", fn_AuthoSession, async (req, res) => {
  res.render("menu");
});

app.get("/pokemon", fn_AuthoSession, async (req, res) => {
  let filter = typeof req.query.filter == "string" ? req.query.filter : "";
  let player: Player | undefined = req.session.player;

  if (!player) return res.status(404).send("Player not found").end();

  let allPokemon: Pokemon[] = await getPokemon();

  if (filter) {
    allPokemon = allPokemon.filter(
      (pokemon) => pokemon.types.indexOf(filter) !== -1
    );
  }

  let heights: number[] = player.pokemon.map((p) => p.height) || [];

  let largest: number | undefined =
    heights.length > 0
      ? heights.reduce((prev, curr) => (curr > prev ? curr : prev))
      : undefined;
  let smallest: number | undefined =
    heights.length > 0
      ? heights.reduce((prev, curr) => (curr < prev ? curr : prev))
      : undefined;

  let usedTypes = player.pokemon.reduce((prev: string[], curr: Pokemon) => {
    for (let type of curr.types) {
      if (!prev.includes(type)) {
        prev.push(type);
      }
    }
    return prev;
  }, []);

  allPokemon = allPokemon.filter(
    (pokemon) => player?.pokemon.find((p) => p.id === pokemon.id) === undefined
  );

  res.render("pokemon", {
    allPokemon: allPokemon,
    player: player,
    largest: largest,
    smallest: smallest,
    usedTypes: usedTypes,
  });
});

app.post("/save", fn_AuthoSession, async (req, res) => {
  try {
    const playerId = req.session.player?._id;
    const pokemons = req.session.player?.pokemon;

    if (!playerId) throw new Error("Player not found");
    if (!pokemons) throw new Error("Pokemons not found");

    await savePlayer(playerId.toString(), pokemons);
    res.redirect("/menu");
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    res.sendStatus(404);
  }
});

app.post("/add/:pokeId", fn_AuthoSession, async (req, res) => {
  let player: Player | undefined = req.session.player;

  let pokemon: Pokemon | null = await getPokemonById(
    parseInt(req.params.pokeId)
  );

  if (!pokemon) return res.status(404).send("Pokemon not found");
  if (!player) return res.status(404).send("Player not found");

  pokemon.currentHP = Math.floor(Math.random() * pokemon.maxHP);

  player.pokemon.push(pokemon);

  console.log(player.pokemon);

  res.redirect("/pokemon");
});

app.post("/delete/:pokeId", fn_AuthoSession, async (req, res) => {
  let player: Player | undefined = req.session.player;
  let pokemon: Pokemon | null = await getPokemonById(
    parseInt(req.params.pokeId)
  );

  if (!pokemon) return res.status(404).send("Pokemon not found");
  if (!player) return res.status(404).send("Player not found");

  player.pokemon = player.pokemon.filter((poke) => poke.id !== pokemon.id);

  res.redirect("/pokemon");
});

app.post("/exit", fn_AuthoSession, async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(app.get("port"), async () => {
  await connect();
  console.log("Server started on http://localhost:" + app.get("port"));
});
