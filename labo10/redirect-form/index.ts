import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { read } from "fs";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

const urls = [
  { id: 1, url: "https://www.google.com", text: "Google" },
  { id: 2, url: "https://www.facebook.com", text: "Facebook" },
  { id: 3, url: "https://www.twitter.com", text: "Twitter" },
  { id: 4, url: "https://www.linkedin.com", text: "LinkedIn" },
  { id: 5, url: "https://www.reddit.com", text: "Reddit" },
  { id: 6, url: "https://www.youtube.com", text: "YouTube" },
  { id: 7, url: "https://www.github.com", text: "GitHub" },
  { id: 8, url: "https://www.stackoverflow.com", text: "StackOverflow" },
  { id: 9, url: "https://www.medium.com", text: "Medium" },
  { id: 10, url: "https://www.wikipedia.org", text: "Wikipedia" },
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello World",
    message: "Hello World",
    listUrls: urls,
  });
});

app.post("/", (req, res) => {
  console.log(req.body);

  req.body.url === ""
    ? res.render("index", {
        title: "Hello World",
        message: "Vull een geldige addres in !",
        listUrls: urls,
      })
    : res.redirect(req.body.url);
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
