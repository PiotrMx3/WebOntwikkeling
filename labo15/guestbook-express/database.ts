import dotenv from "dotenv";
import {Collection, MongoClient} from "mongodb";
import {GuestBookEntry} from "./types";
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is not defined");

const client = new MongoClient(uri);
const guestBookCollection: Collection<GuestBookEntry> = client
  .db("exercises")
  .collection<GuestBookEntry>("guestbook");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.log("Error in exit func ", error);
  }
  process.exit(0);
}

export async function initDb() {
  try {
    await client.connect();
    console.log("Connected to database");
    process.on("SIGINT", exit);
  } catch (error) {
    console.log("Error in initDb func ", error);
  }
}

export async function getAllEntries() {
  return await guestBookCollection.find({}).toArray();
}

export async function newEntries(entry: GuestBookEntry) {
  const result = await guestBookCollection.insertOne(entry);
  console.log("Message recived id: ", result.insertedId);
}
