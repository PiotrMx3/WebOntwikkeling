import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {
  ageBetween,
  animalsByType,
  animalSort,
  getAllAnimals,
  initDb,
  searchTerm,
} from "./database";
import {register} from "module";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello World",
    message: "Hello World",
  });
});

app.get("/pets", async (req, res) => {
  const allAnimals = await getAllAnimals();
  res.render("pets", {
    animals: allAnimals,
  });
});

app.get("/pets/sort", async (req, res) => {
  const type = typeof req.query.q === "string" ? req.query.q : "name";

  if (!["name", "type", "age", "breed"].includes(type)) {
    return res.sendStatus(404);
  }

  const allAnimals = await animalSort(type);
  res.render("pets", {
    animals: allAnimals,
  });
});

app.get("/pets/agebetween", async (req, res) => {
  const min = typeof req.query.min === "string" ? parseInt(req.query.min) : -1;
  const max = typeof req.query.max === "string" ? parseInt(req.query.max) : -1;

  const allAnimals = await getAllAnimals();
  const ageRange = await ageBetween(min, max);

  if (min === -1 || max === -1) {
    return res.render("pets", {
      animals: allAnimals,
    });
  }

  res.render("pets", {
    animals: ageRange,
  });
});

app.get("/pets/search", async (req, res) => {
  const searchTermUser = typeof req.query.q === "string" ? req.query.q : "";
  const animalsFound = await searchTerm(searchTermUser);

  res.render("search", {
    animals: animalsFound,
  });
});

app.get("/pets/:type", async (req, res) => {
  const type = req.params.type ?? "";

  const allAnimals = await animalsByType(type);
  res.render("pets", {
    animals: allAnimals,
  });
});

app.listen(app.get("port"), async () => {
  await initDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
