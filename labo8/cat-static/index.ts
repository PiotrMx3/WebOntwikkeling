import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

const catPics: string[] = [
  "cat1",
  "cat2",
  "cat3",
  "cat4",
  "cat5",
  "cat6",
  "cat7",
  "cat8",
  "cat9",
  "cat10",
];

app.get("/cats/images", (req, res) => {
  res.render("index", {
    cats: catPics,
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
