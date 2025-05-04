import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {findAll, initDb} from "./database";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/users", async (req, res) => {
  const allUsers = await findAll();

  res.render("index", {
    title: "CRUD World",
    users: allUsers,
  });
});

app.get("/users/create", async (req, res) => {
  res.render("create", {
    title: "CRUD World",
  });
});

app.listen(app.get("port"), async () => {
  await initDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
