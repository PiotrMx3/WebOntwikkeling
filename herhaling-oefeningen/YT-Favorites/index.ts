import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {initDB} from "./database/mongoClient";
import sessionDb from "./database/sessionDb";
import {routerLogin} from "./routers/routerLogin";
import {middlewareFlashMessage} from "./utilities/middelwareFlashMessage";
import {middlewareUserAutho} from "./utilities/middlewareUserAutho";
import {getAllMovies, updateById} from "./database/querys";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);
app.use(sessionDb);

app.use(middlewareFlashMessage);

app.get("/", middlewareUserAutho, async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const field = typeof req.query.field === "string" ? req.query.field : "";
  const direction =
    typeof req.query.direction === "string" ? req.query.direction : "";

  const movies = await getAllMovies(q, field, direction);

  res.render("index", {
    movies: movies,
    q: q,
    field: field,
    direction: direction,
  });
});

app.post("/update/:id", async (req, res) => {
  const id = typeof req.params.id === "string" ? req.params.id : "";
  await updateById(id);
  res.redirect("/");
});

app.use("/login", routerLogin());

app.listen(app.get("port"), async () => {
  try {
    await initDB();
    console.log("Server started on http://localhost:" + app.get("port"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
