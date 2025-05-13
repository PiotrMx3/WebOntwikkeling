import dotenv from "dotenv";
dotenv.config();
import {MongoClient} from "mongodb";
import {User} from "./types";
import bcrypt from "bcrypt";

export async function login(email: string, password: string) {
  if (email === "" || password === "") {
    throw new Error("Email and password required");
  }
  let user: User | null = await userCollection.findOne<User>({email: email});
  if (user) {
    if (await bcrypt.compare(password, user.password!)) {
      return user;
    } else {
      throw new Error("Password incorrect");
    }
  } else {
    throw new Error("User not found");
  }
}

// User aanmaken Logica

const saltRounds: number = 10;
export async function createInitialUser() {
  if ((await userCollection.countDocuments()) > 0) {
    return;
  }
  let email: string | undefined = process.env.ADMIN_EMAIL;
  let password: string | undefined = process.env.ADMIN_PASSWORD;
  if (email === undefined || password === undefined) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment"
    );
  }
  await userCollection.insertOne({
    email: email,
    password: await bcrypt.hash(password, saltRounds),
    role: "ADMIN",
  });
}

// DB Connectie Logica

export const MONGODB_URI = process.env.MONGO_URI ?? "";

export const client = new MongoClient(MONGODB_URI);

export const userCollection = client
  .db("login-express")
  .collection<User>("users");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

export async function connect() {
  await client.connect();
  console.log("Connected to database");
  process.on("SIGINT", exit);
}
