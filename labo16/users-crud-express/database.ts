import dotenv from "dotenv";
import {Collection, MongoClient} from "mongodb";
import {User} from "./types";
import {connect} from "http2";

dotenv.config();

const client = getMongoClient();
const collectionUsers: Collection<User> = client
  .db("exercises")
  .collection<User>("CRUD");

export async function findAll() {
  const result = await collectionUsers.find<User>({}).toArray();
  return result;
}

async function seed() {
  try {
    if ((await collectionUsers.countDocuments()) === 0) {
      console.log("Database is empty fetching data from API");
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("Error in fetch");
      const data: User[] = await response.json();

      const result = await collectionUsers.insertMany(data);
      console.log(
        "Data successful load from API amount of records: ",
        result.insertedCount
      );
    }
  } catch (error) {
    console.error("Error in seed :", error);
    process.exit(1);
  }
}

export async function initDb() {
  try {
    await client.connect();
    await seed();
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
