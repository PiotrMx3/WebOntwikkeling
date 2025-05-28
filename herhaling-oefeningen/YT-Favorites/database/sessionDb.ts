import dotenv from "dotenv";
import session from "express-session";
import mongoDbSession from "connect-mongodb-session";
import {mongoUri} from "./mongoClient";
import {Flash, User} from "../types/types";
dotenv.config();

const MongoDBStore = mongoDbSession(session);
const uri = mongoUri();
const mongoStore = new MongoDBStore({
  uri: uri,
  collection: "ytsession",
  databaseName: "youtube",
});

mongoStore.on("error", (error) => {
  console.error(error);
});

declare module "express-session" {
  export interface SessionData {
    user?: User;
    flashMessage?: Flash;
  }
}

export default session({
  secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
  store: mongoStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
});
