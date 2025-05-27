import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {createUser, initDb, login} from "./database/database";
import session from "./database/session";
import {autorizationSession} from "./middleware/authorization";
import {flashMiddleWare} from "./middleware/flash";
import cookieParser from "cookie-parser";
import {jwtToken} from "./utilities/jwtToken";
import {jwtAutho} from "./middleware/jwtTokenAutho";

dotenv.config();

const app: Express = express();
app.use(session);
app.use(flashMiddleWare);
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  // if (req.cookies.jwt) res.redirect("/home");
  res.render("index");
});

app.get("/home", jwtAutho, (req, res) => {
  res.render("home");
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await login(email, password);
    delete user.password;
    jwtToken(res, user);
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
    res.clearCookie("jwt");
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
