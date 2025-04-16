import {Collection, MongoClient} from "mongodb";
import dotenv from "dotenv";
import {cp} from "fs";
import {TeamPokemon} from "./types";
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("Mondo CLient not defined");

const client = new MongoClient(uri);
const pokemonTeamCollection: Collection<TeamPokemon> = client
  .db("exercises")
  .collection<TeamPokemon>("poke-team");

async function exit() {
  try {
    await client.close();
  } catch (error) {
    console.log("Error in exit func ", error);
  }
  process.exit(0);
}

export async function initDb() {
  try {
    await client.connect();
    process.on("SIGINT", exit);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error in initDb func ", error);
  }
}

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

export async function insertIntoTeam(pokemon: TeamPokemon) {
  const result = await pokemonTeamCollection.insertOne(pokemon);
  console.log(result.insertedId);
}

export async function findAllFromTeam() {
  return pokemonTeamCollection.find({}).toArray();
}

export async function findOne(pokemon: string) {
  return await pokemonTeamCollection.findOne<TeamPokemon>({pokemon});
}
