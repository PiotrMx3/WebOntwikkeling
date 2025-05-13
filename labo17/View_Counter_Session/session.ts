import dotenv from "dotenv";
import session from "express-session";
import mongoDbSession from "connect-mongodb-session";

dotenv.config();

interface Cart {
  [key: string]: number;
}

const MongoDBStore = mongoDbSession(session);

const mongoStore = new MongoDBStore({
  uri: process.env.MONGO_URI ?? "",
  collection: "sessions",
  databaseName: "SessionsLabo",
});

mongoStore.on("error", (error) => {
  console.log(error);
});

declare module "express-session" {
  interface SessionData {
    username?: string;
    cart?: Cart[];
  }
}

export default session({
  secret: process.env.MY_SECRET ?? "",
  store: mongoStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
  },
});
