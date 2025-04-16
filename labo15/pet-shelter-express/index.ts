import express, {Express, query} from "express";
import dotenv from "dotenv";
import path from "path";
import {
  ageBetween,
  innitDb,
  petsByIndex,
  petsByType,
  printPets,
  sortByField,
} from "./database";
import {Pet} from "./types";

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
  const pets: Pet[] = await printPets();
  if (pets && pets.length !== 0) {
    res.render("pets", {
      pets: pets,
      error: false,
    });
  } else {
    res.render("pets", {
      pets: pets,
      error: true,
    });
  }
});

app.get("/pets/sort", async (req, res) => {
  const field = typeof req.query.field === "string" ? req.query.field : "name";

  const pets: Pet[] | null = await sortByField(field);

  if (pets && pets.length !== 0) {
    res.render("pets", {
      pets: pets,
      error: false,
    });
  } else {
    res.render("pets", {
      pets: pets,
      error: true,
    });
  }
});

app.get("/pets/agebetween", async (req, res) => {
  const ageOne =
    typeof req.query.ageone === "string" ? parseInt(req.query.ageone, 10) : 0;
  const ageTwo =
    typeof req.query.agetwo === "string" ? parseInt(req.query.agetwo, 10) : 0;

  const pets: Pet[] | null = await ageBetween(ageOne, ageTwo);

  if (ageOne === 0 && ageTwo === 0) {
    res.render("pets", {
      pets: await printPets(),
      error: false,
    });
    return;
  }

  if (pets && pets.length !== 0) {
    res.render("pets", {
      pets: pets,
      error: false,
    });
  } else {
    res.render("pets", {
      pets: [],
      error: true,
    });
  }
});

app.get("/pets/search", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";

  let pets: Pet[] | null = [];

  if (q === "") {
    res.render("search", {
      pets: pets,
      error: false,
    });
    return;
  }

  pets = await petsByIndex(q);

  if (pets && pets.length !== 0) {
    res.render("search", {
      pets: pets,
      error: false,
    });
  } else {
    res.render("search", {
      pets: pets,
      error: true,
    });
  }
});

app.get("/pets/:type", async (req, res) => {
  const type = req.params.type;
  const pets: Pet[] | null = await petsByType(type);

  if (pets && pets.length !== 0) {
    res.render("pets", {
      pets: pets,
      error: false,
    });
  } else {
    res.render("pets", {
      pets: [],
      error: true,
    });
  }
});

app.listen(app.get("port"), async () => {
  await innitDb();
  console.log("Server started on http://localhost:" + app.get("port"));
});
