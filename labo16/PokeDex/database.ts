import {Collection, MongoClient, ObjectId, ObjectId as string} from "mongodb";
import dotenv from "dotenv";
import {Generation, Player, PokeApiPokemon, Pokemon} from "./types";
import {platform} from "os";

dotenv.config();

const uri = process.env.MONGO_URI ?? "";
const client = new MongoClient(uri);

const colletionPokemonUser: Collection<Player> = client
  .db("POKEDEXAPP")
  .collection<Player>("Player");

const collectionPokemonApi: Collection<Pokemon> = client
  .db("POKEDEXAPP")
  .collection<Pokemon>("Pokemons");

export let playersCache: Player[] = [];

export async function savePlayer(playerId: string, pokemonsToSave: Pokemon[]) {
  const result = await colletionPokemonUser.updateOne(
    {
      _id: new ObjectId(playerId),
    },
    {$set: {pokemon: pokemonsToSave}}
  );

  return result;
}

export async function addPokemonToPlayer(playerId: string, pokemonId: number) {
  const player = playersCache.find(
    (player) => player._id?.toString() === playerId
  );

  const pokemon = await collectionPokemonApi.findOne<Pokemon>({id: pokemonId});

  if (pokemon && player) {
    const existing = player.pokemon.find((el) => el.id === pokemonId);
    if (!existing) {
      player.pokemon.push(pokemon);
      return;
    }
    console.log("Already in you team !");
  }
}

export async function getAllPokemons() {
  const result = await collectionPokemonApi.find<Pokemon>({}).toArray();
  return result;
}

async function pokemonApi() {
  const pokemonFrommatted: Pokemon[] = [];

  try {
    const response = await fetch("https://pokeapi.co/api/v2/generation/1");

    if (!response.ok) throw new Error(`API error ${response.status}`);

    const data: Generation = await response.json();

    const speciesList = data.pokemon_species;

    for (const pokemon of speciesList) {
      const responseGen = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      if (!responseGen.ok) throw new Error(`API error ${responseGen.status}`);

      const poke: PokeApiPokemon = await responseGen.json();

      const hpEntry = poke.stats.find((s) => s.stat.name === "hp");
      const maxHP = hpEntry?.base_stat ?? 0;

      const formattedPoke: Pokemon = {
        id: poke.id,
        name: poke.name,
        types: poke.types.map((el) => el.type.name),
        image: poke.sprites.front_default,
        height: poke.height,
        weight: poke.weight,
        maxHP: maxHP,
        currentHP: hpEntry?.base_stat ?? maxHP,
      };

      pokemonFrommatted.push(formattedPoke);
    }

    return pokemonFrommatted;
  } catch (error) {
    if (error instanceof Error) console.error("error in fetch", error.message);
    process.exit(1);
  }
}

async function seed() {
  try {
    if ((await collectionPokemonApi.countDocuments()) === 0) {
      console.log("Data loading from API");
      const data = await pokemonApi();
      await collectionPokemonApi.insertMany(data);
    }
  } catch (error) {
    console.error("error in seed", error);
    process.exit(1);
  }
}

export async function createUser(newUserName: string) {
  const newUser: Player = {
    name: newUserName,
    pokemon: [],
  };

  const result = await colletionPokemonUser.insertOne(newUser);

  if (!result.insertedId) throw new Error("Error user not add");

  newUser._id = result.insertedId;
  playersCache.push(newUser);

  return result;
}

async function loadPlayersCache() {
  const players: Player[] = await colletionPokemonUser
    .find<Player>({})
    .toArray();

  playersCache = players;
}

export async function initDb() {
  try {
    await client.connect();
    await loadPlayersCache();
    await seed();
    process.on("SIGINT", exit);
    console.log("Connected to DB");
  } catch (error) {
    console.error("eeror in initDb", error);
    process.exit(1);
  }
}

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from DB");
    process.exit(0);
  } catch (error) {
    console.error("eeror in exit", error);
    process.exit(1);
  }
}
