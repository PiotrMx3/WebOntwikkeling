import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { dir } from "console";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

interface Person {
  name: string;
  age: number;
}

interface Field {
  value: string;
  selected: string;
  text: string;
}

interface Direction {
  value: string;
  selected: string;
  text: string;
}

const persons: Person[] = [
  { name: "Sven", age: 25 },
  { name: "Andie", age: 24 },
  { name: "George", age: 30 },
  { name: "Zeoff", age: 28 },
];

function filterFunc(persons: Person[], q: string): Person[] {
  const formatted: Person[] = persons.filter((el) =>
    el.name.toLowerCase().startsWith(q.toLowerCase())
  );

  return formatted;
}

app.get("/", (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";

  const personsAfterFilter: Person[] = filterFunc(persons, q);
  console.log(personsAfterFilter);

  res.render("index", {
    title: "Toets Yoepi !!",
    q: q,
    persons: personsAfterFilter,
  });
});

app.get("/sort", (req, res) => {
  const field =
    typeof req.query.sortDirection === "string" ? req.query.sortField : "";
  const sort =
    typeof req.query.sortDirection === "string" ? req.query.sortDirection : "";

  const fields: Field[] = [
    {
      value: "name",
      selected: field === "name" ? "selected" : "",
      text: "Naam",
    },
    {
      value: "age",
      selected: field === "age" ? "selected" : "",
      text: "Leeftijd",
    },
  ];

  const direction: Direction[] = [
    {
      value: "asc",
      selected: sort === "asc" ? "selected" : "",
      text: "ASC",
    },
    {
      value: "desc",
      selected: sort === "desc" ? "selected" : "",
      text: "DESC",
    },
  ];

  const formatted: Person[] = [...persons].sort((a, b) => {
    if (field === "age") {
      return sort === "asc" ? a.age - b.age : b.age - a.age;
    } else {
      return sort === "asc"
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase());
    }
  });

  res.render("sort", {
    title: "Toets Yoepi!!",
    sortField: sort,
    sortDirection: field,
    persons: formatted,
    fields: fields,
    direction: direction,
  });
});

app.use((req, res) => {
  // res.type("text/html");
  res.sendStatus(404);
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
