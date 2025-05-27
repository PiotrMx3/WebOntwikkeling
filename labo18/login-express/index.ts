import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {createUser, initDb, login} from "./database/database";
import session from "./database/session";
import {autorization} from "./middleware/authorization";
import {flashMiddleWare} from "./middleware/flash";

dotenv.config();

const app: Express = express();
app.use(session);
app.use(flashMiddleWare);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", autorization, (req, res) => {
  res.render("home");
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await login(email, password);
    delete user.password;

    req.session.user = user;
    req.session.message = {type: "success", message: " Welcome"};
    res.redirect("/home");
  } catch (error) {
    if (error instanceof Error) {
      req.session.message = {type: "error", message: error.message};
    }

    res.redirect("/");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/home");
  });
});

app.listen(app.get("port"), async () => {
  try {
    await initDb();
    await createUser();
    console.log("Server started on http://localhost:" + app.get("port"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
