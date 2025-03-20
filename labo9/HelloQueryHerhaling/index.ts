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

app.get("/", (req, res) => {
  const languageInput: string = (
    typeof req.query.language === "string" ? req.query.language : ""
  ).toLowerCase();

  let msgOut: string = "";

  if (
    languageInput.toLowerCase() === "en" ||
    !["en", "es", "fr"].includes(languageInput)
  ) {
    msgOut = "Hello World!";
  } else if (languageInput.toLowerCase() === "es") {
    msgOut = "¡Hola Mundo!";
  } else if (languageInput.toLowerCase() === "fr") {
    msgOut = "Bonjour le monde!";
  }

  res.render("index", {
    title: msgOut,
    message: msgOut,
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
