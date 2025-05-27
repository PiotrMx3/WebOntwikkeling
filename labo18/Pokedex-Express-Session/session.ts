import session, {MemoryStore} from "express-session";
import {Player} from "./types";
import mongoDbSession from "connect-mongodb-session";

import dotenv from "dotenv";
dotenv.config();

const MongoDBStore = mongoDbSession(session);

const mongoStore = new MongoDBStore({
  uri: process.env.MONGODB_URI ?? "",
  collection: "sessions",
  databaseName: "pokedex-express-session",
});

declare module "express-session" {
  export interface SessionData {
    player: Player;
  }
}

export default session({
  secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
  store: mongoStore,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
});
