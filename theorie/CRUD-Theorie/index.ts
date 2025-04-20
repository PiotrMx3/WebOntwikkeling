import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {
  findByid,
  getUsers,
  initDb,
  insertUser,
  removeUser,
  updateUser,
} from "./database";
import {User} from "./types";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/users", async (req, res) => {
  const users = await getUsers();

  res.render("index", {
    title: "Hello CRUD",
    users: users,
  });
});

app.get("/users/create", (req, res) => {
  res.render("create", {});
});

app.post("/users/create", async (req, res) => {
  const dataToInsert: User = req.body;
  await insertUser(dataToInsert);
  res.redirect("/users");
});

app.post("/users/:id/delete", async (req, res) => {
  const id = typeof req.params.id === "string" ? parseInt(req.params.id) : 0;

  if (id === 0) res.sendStatus(404);

  await removeUser(id);
  res.redirect("/users");
});

app.get("/users/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await findByid(id);
  if (!user) throw new Error("Error no user found !");

  res.render("update", {
    user: user,
  });
});

app.post("/users/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const updateData: User = req.body;

  await updateUser(id, updateData);
  res.redirect("/users");
});

app.listen(app.get("port"), async () => {
  await initDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
