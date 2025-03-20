import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();

// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

interface DadJoke {
  id: string;
  joke: string;
  status: number;
}

async function fetchDadJoke(): Promise<DadJoke> {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });

  const data: DadJoke = await response.json();

  return data;
}

app.set("port", process.env.PORT ?? 3000);

app.get("/joke/json", async (req, res) => {
  const data = await fetchDadJoke();
  res.json(data);
});

app.get("/joke/html", async (req, res) => {
  const data = await fetchDadJoke();

  res.render("index", {
    title: "Dad Joke",
    message: data.joke,
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
