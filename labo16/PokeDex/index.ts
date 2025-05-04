import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {
  addPokemonToPlayer,
  createUser,
  getAllPokemons,
  initDb,
  playersCache,
  savePlayer,
} from "./database";
import {ObjectId} from "mongodb";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

app.get("/", async (req, res) => {
  res.render("index", {
    players: playersCache,
  });
});

app.post("/createPlayer", async (req, res) => {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";

  if (name.trim() === "") {
    return res.sendStatus(500).end();
  }

  try {
    await createUser(name);
  } catch (error) {
    console.error("error in createUser:", error);
    return res.status(500).end();
  }

  res.redirect("/");
});

app.get("/player/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.sendStatus(400).end();
  }
  const user = playersCache.find((el) => el._id?.toString() === id);

  if (!user) return res.status(404).end();
  res.render("player", {
    id: id,
    player: user,
  });
});

app.get("/player/:id/pokemon", async (req, res) => {
  const playerId = req.params.id;
  const user = playersCache.find((el) => el._id?.toString() === playerId);

  if (!user) {
    return res.sendStatus(404).end();
  }

  const allPokemons = await getAllPokemons();
  const pokemonsFilterByUser = allPokemons.filter((pokemon) => {
    let exist: Boolean = true;

    for (const poke of user.pokemon) {
      if (pokemon.id === poke.id) {
        exist = false;
        break;
      }
    }

    return exist;
  });

  const userTypes: string[] = [];
  for (const type of user.pokemon) {
    for (const types of type.types) {
      if (!userTypes.includes(types)) {
        userTypes.push(types);
      }
    }
  }

  const sortedByHeight = user.pokemon
    ? [...user.pokemon].sort((a, b) => a.height - b.height)
    : [];

  const heightRange = sortedByHeight.length
    ? {
        min: sortedByHeight[0].height,
        max: sortedByHeight[sortedByHeight.length - 1].height,
      }
    : {min: 0, max: 0};

  res.render("pokemon", {
    playerId: playerId,
    player: user,
    pokemons: pokemonsFilterByUser,
    types: userTypes,
    heightRange: heightRange,
  });
});

app.post("/player/:id/save", async (req, res) => {
  const playerId = req.params.id;

  if (!ObjectId.isValid(playerId)) {
    return res.sendStatus(400);
  }

  const user = playersCache.find((el) => el._id?.toString() === playerId);
  const pokemontoSave = user?.pokemon ? user.pokemon : [];

  await savePlayer(playerId, pokemontoSave);
  res.redirect("/player/" + req.params.id);
});

app.post("/player/:id/pokemon/add/:pokeId", async (req, res) => {
  const playersId = req.params.id;
  const pokemonId = parseInt(req.params.pokeId);
  await addPokemonToPlayer(playersId, pokemonId);

  res.redirect("/player/" + req.params.id + "/pokemon");
});

app.post("/player/:id/pokemon/delete/:pokeId", async (req, res) => {
  const playerId = req.params.id;
  const pokeId = parseInt(req.params.pokeId);
  const user = playersCache.find((el) => el._id?.toString() === playerId);

  if (!user) {
    return res.sendStatus(404).end();
  }

  const afterRemove = user.pokemon.filter((el) => el.id !== pokeId);
  console.log(afterRemove);

  user.pokemon = afterRemove;

  res.redirect("/player/" + req.params.id + "/pokemon");
});

app.listen(app.get("port"), async () => {
  await initDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
