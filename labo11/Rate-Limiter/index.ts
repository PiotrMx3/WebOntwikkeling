import express, { Express } from "express";
import limiter from "./middleware/timeLimiter";
import dotenv from "dotenv";
import path from "path";
import { time } from "console";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

let lastCall = { time: Date.now() };

app.use(limiter(lastCall, { timeInterval: 2000 }));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello World",
    message: "Hello World",
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
