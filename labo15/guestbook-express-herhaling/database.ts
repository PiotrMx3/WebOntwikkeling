import dotenv from "dotenv";
import {Collection, MongoClient} from "mongodb";
import {GuestBookEntry} from "./types";

dotenv.config();

const client = getMongoClient();
const collectionGuests: Collection<GuestBookEntry> = client
  .db("exercises")
  .collection<GuestBookEntry>("guestbook");

export async function initDb() {
  try {
    await client.connect();

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

export async function addPost(post: GuestBookEntry) {
  const result = await collectionGuests.insertOne(post);
  console.log("New post created with ID: ", result.insertedId);
}

export async function findAllRecords() {
  const result = await collectionGuests.find({}).toArray();

  const withFormattedDate = mapDate(result);

  return withFormattedDate;
}

function mapDate(result: GuestBookEntry[]) {
  const afterFormat = result.map((post) => {
    return {
      ...post,
      formattedDate: post.date.toISOString(),
    };
  });

  return afterFormat;
}
