import dotenv from "dotenv";
import {Collection, MongoClient} from "mongodb";
import {User} from "../types/interfaces";
import {Express} from "express";
import * as bcrypt from "bcrypt";

dotenv.config();

export async function login(email: string, password: string) {
  if (email === "" && password === "") {
    throw new Error("Password and Email are empty!");
  }

  const user = await userCollection.findOne<User>({email: email});

  if (user) {
    if (await bcrypt.compare(password, user.password!)) {
      return user;
    } else {
      throw new Error("Password not correct!");
    }
  } else {
    throw new Error("User not Find!");
  }
}

export async function createUser() {
  const saltRounds = 10;

  if ((await userCollection.countDocuments()) > 0) {
    return;
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (email === undefined || password === undefined) {
    throw new Error("ENV FILES IS MISSING MAIL AND PASSWORD PARAMETERS");
  }

  await userCollection.insertOne({
    name: "Piotr",
    email: email,
    role: "ADMIN",
    password: await bcrypt.hash(password, saltRounds),
  });
}

const DB = process.env.MONGO_URI ?? "";
const client = new MongoClient(DB);

const userCollection: Collection<User> = client
  .db("login-express")
  .collection<User>("users");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from DB");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export async function initDb() {
  await client.connect();
  console.log("Connected to DB");
  process.on("SIGINT", exit);
}
