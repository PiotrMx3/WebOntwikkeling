import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {getAllEntries, initDb, newEntries} from "./database";
import {mapEntriesWithFormattedDate} from "./utils";
import {GuestBookEntry} from "./types";
import {networkInterfaces} from "os";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", async (req, res) => {
  const rawEntries = await getAllEntries();

  const entries = mapEntriesWithFormattedDate(rawEntries).reverse();

  res.render("index", {
    title: "Hello World",
    entries: entries,
  });
});

app.post("/", async (req, res) => {
  const newEntry = {
    ...req.body,
    date: new Date(),
  };

  await newEntries(newEntry);

  res.redirect("/");
});

app.listen(app.get("port"), async () => {
  await initDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
