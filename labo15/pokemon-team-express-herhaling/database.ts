import {Collection, MongoClient} from "mongodb";
import dotenv from "dotenv";
import {TeamPokemon} from "./types";
import {cp} from "fs";
dotenv.config();

const client = getMongoClient();
const collectionPokeTeam: Collection<TeamPokemon> = client
  .db("exercises")
  .collection<TeamPokemon>("poke-team");

export async function insertPokemon(pokemon: string) {
  const poke: TeamPokemon = {
    pokemon: pokemon,
  };
  const result = await collectionPokeTeam.insertOne(poke);
  console.log("Created new Record with ID :", result.insertedId);
}

export async function findInTeam(pokemon: string) {
  const result = await collectionPokeTeam.findOne<TeamPokemon>({
    pokemon: pokemon,
  });

  return result;
}

export async function findAll() {
  const result = await collectionPokeTeam.find<TeamPokemon>({}).toArray();
  return result;
}

export async function initDb() {
  try {
    await client.connect();
    console.log("Connected to Database");
    process.on("SIGINT", exitHandler);
  } catch (error) {
    console.error("Error in initDb :", error);
    process.exit(1);
  }
}

async function exitHandler() {
  try {
    await client.close();
    console.log("Disconnected from Database");
    process.exit(0);
  } catch (error) {
    console.error("Error in exit :", error);
    process.exit(1);
  }
}

function getMongoClient() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Connection string in .ENV is not defined");
    process.exit(1);
  }

  return new MongoClient(uri);
}
