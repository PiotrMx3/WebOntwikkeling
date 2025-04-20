import {Collection, MongoClient} from "mongodb";
import dotenv from "dotenv";
import {User} from "./types";

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MongoDb Client Undefined");

const client = new MongoClient(uri);
const userCollection: Collection<User> = client
  .db("exercises")
  .collection<User>("users");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from Database");
  } catch (error) {
    console.log("Error in Exit: ", error);
  }
  process.exit(0);
}

export async function initDb() {
  try {
    await client.connect();
    await loadDataFromApi();
    process.on("SIGINT", exit);
    console.log("Connected to  Database");
  } catch (error) {
    console.log("Error in initDb", error);
  }
}

export async function getUsers() {
  return await userCollection.find({}).toArray();
}

async function loadDataFromApi() {
  const users: User[] = await getUsers();

  if (users.length === 0) {
    console.log("Database is empty, Loading data from API");
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: User[] = await response.json();
    await userCollection.insertMany(users);
  }
}

async function newId() {
  const result = await userCollection
    .find<User>({})
    .sort({id: -1})
    .limit(1)
    .toArray();

  return result.length === 0 ? 1 : result[0].id + 1;
}

export async function insertUser(user: User) {
  user.id = await newId();
  const result = userCollection.insertOne(user);
  console.log(
    "User created with following Id: ",
    user.id,
    "MongoDb id: ",
    (await result).insertedId
  );
}

export async function removeUser(id: number) {
  const result = await userCollection.deleteOne({id: id});
  console.log(result.deletedCount);
}

export async function findByid(id: number) {
  const result = await userCollection.findOne<User>({id: id});
  return result;
}

export async function updateUser(id: number, user: User) {
  await userCollection.updateOne({id: id}, {$set: user});
}
