import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {addPost, findAllRecords, initDb} from "./database";
import {timeStamp} from "console";
import {GuestBookEntry} from "./types";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", async (req, res) => {
  const allRecords = await findAllRecords();

  res.render("index", {
    title: "Hello World",
    all: allRecords,
  });
});

app.post("/", async (req, res) => {
  const newPost: GuestBookEntry = {...req.body, date: new Date()};
  await addPost(newPost);
  res.redirect("/");
});

app.listen(app.get("port"), async () => {
  await initDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
