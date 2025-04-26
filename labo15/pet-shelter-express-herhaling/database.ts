import dotenv from "dotenv";
import {Collection, MongoClient, NumericType} from "mongodb";
import {Pet} from "./types";

dotenv.config();

const client = getMongoClient();
const collectionPet: Collection<Pet> = client
  .db("exercises")
  .collection<Pet>("dieren");

export async function initDb() {
  try {
    await client.connect();
    await collectionPet.dropIndex("*");
    await collectionPet.createIndex({
      name: "text",
      type: "text",
      breed: "text",
    });
    process.on("SIGINT", exit);
    console.log("Connected to Db");
  } catch (error) {
    console.error("Error in initDb: ", error);
    process.exit(1);
  }
}

async function exit() {
  try {
    await client.close();
    console.log("Disnnected from Db");
    process.exit(0);
  } catch (error) {
    console.error("Error in exit: ", error);
    process.exit(1);
  }
}

function getMongoClient() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Connecting string undefined in .env file");
    process.exit(1);
  }
  return new MongoClient(uri);
}

export async function searchTerm(search: string) {
  const result = await collectionPet
    .find<Pet>({$text: {$search: search}})
    .toArray();
  return result;
}

export async function ageBetween(min: number, max: number) {
  const result = await collectionPet
    .find<Pet>({$and: [{age: {$gte: min}}, {age: {$lte: max}}]})
    .toArray();
  return result;
}

export async function animalSort(sort: string) {
  const result = await collectionPet
    .find<Pet>({})
    .sort({[sort]: 1})
    .toArray();
  return result;
}

export async function animalsByType(type: string) {
  const result = await collectionPet.find<Pet>({type: type}).toArray();
  return result;
}

export async function getAllAnimals() {
  const result = await collectionPet.find<Pet>({}).toArray();
  return result;
}
