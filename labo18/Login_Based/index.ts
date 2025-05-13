import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {connect, createInitialUser, login} from "./database";
import session from "./session";
import {User} from "./types";
import {secureMiddleware} from "./secureMiddleware";
import {register} from "module";
import {rmSync} from "fs";
import {FlashMessage} from "./flashMiddelware";
import {localsName} from "ejs";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(session);
app.use(FlashMessage);

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  console.log(req.session.user);
  res.render("index", {
    title: "Hello World",
    message: "Hello World",
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    let user: User = await login(email, password);
    req.session.message = {type: "success", message: "Logged In"};
    delete user.password;
    req.session.user = user;
    res.redirect("/home");
  } catch (e: any) {
    req.session.message = {type: "error", message: e.message};
    return res.redirect("/login");
  }
});

app.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("home", {
      user: req.session.user,
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/logout", async (req, res) => {
  console.log("logout");
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(app.get("port"), async () => {
  try {
    await connect();
    await createInitialUser();
    console.log("Server started on http://localhost:" + app.get("port"));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});
