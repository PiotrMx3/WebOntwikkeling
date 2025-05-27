import {Collection, MongoClient} from "mongodb";
import dotenv from "dotenv";
import {MoviesFetch, MoviesToDb, User} from "../interfaces/interfaces";
import bcrypt from "bcrypt";

dotenv.config();

export function mongoUri() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("URI String in .ENV is empty !");
  return uri;
}

const client = new MongoClient(mongoUri());

export const collectionUsers: Collection<User> = client
  .db("youtube")
  .collection<User>("ytusers");

export const collectionYtMovies: Collection<MoviesToDb> = client
  .db("youtube")
  .collection<MoviesToDb>("ytmovies");

async function seedFetchMovies() {
  const clearDb =
    (process.env.CLEAR_DB_ON_RESTART?.trim().toLowerCase() ?? "false") ===
    "true";

  if (clearDb) {
    const {deletedCount} = await collectionYtMovies.deleteMany({});
    console.log("There are ", deletedCount, " records deleted");
  }

  if ((await collectionYtMovies.countDocuments()) > 0) {
    console.log("Movies exist in DB");
    return;
  } else {
    const data = await fetch(
      "https://raw.githubusercontent.com/similonap/json/master/videos.json"
    );

    if (!data.ok)
      throw new Error(`Error in fetch: ${data.status}, ${data.statusText}`);

    const result: MoviesFetch = await data.json();

    const formatted: MoviesToDb[] = result.videos.map((el) => {
      return {
        ...el,
        fav: 0,
      };
    });

    const {insertedCount} = await collectionYtMovies.insertMany(formatted);
    console.log("Ther are", insertedCount, " records add to DB");
  }
}

async function seedUsersFromEnv() {
  const saltRound = 10;

  const clearDb =
    (process.env.CLEAR_DB_ON_RESTART?.trim().toLowerCase() ?? "false") ===
    "true";

  if (clearDb) {
    const {deletedCount} = await collectionUsers.deleteMany({});
    console.log("There are ", deletedCount, " records deleted");
  }

  if ((await collectionUsers.countDocuments()) > 0) {
    console.log("users exist in DB");
    return;
  } else {
    if (!process.env.USER_ONE) throw new Error("UserOne not exist in .ENV");
    if (!process.env.USER_TWO) throw new Error("UserTwo not exist in .ENV");
    if (!process.env.USER_ONE_PASSWORD)
      throw new Error("PasswoordOne not exist in .ENV");
    if (!process.env.USER_TWO_PASSWORD)
      throw new Error("PasswoordTwo not exist in .ENV");

    const usersToInsert: User[] = [
      {
        email: process.env.USER_ONE,
        password: await bcrypt.hash(process.env.USER_ONE_PASSWORD, saltRound),
      },
      {
        email: process.env.USER_TWO,
        password: await bcrypt.hash(process.env.USER_TWO_PASSWORD, saltRound),
      },
    ];

    return await collectionUsers.insertMany(usersToInsert);
  }
}

async function closeDb() {
  try {
    await client.close();
    console.log("Disconnected from DB");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

export async function initDB() {
  try {
    await client.connect();
    await seedUsersFromEnv();
    await seedFetchMovies();
    console.log("Connected to DB");
    process.on("SIGINT", closeDb);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Fault in InitDb", error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }
}
