import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import session from "./session";
import {register} from "module";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(session);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  const car = (req.session.cart ??= []);

  req.session.cart.push({
    apple: 3,
  });

  console.log(req.session);

  res.render("index", {
    title: "Hello World",
    message: "Hello World",
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
