import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {initDB} from "./database/mongoClient";
import sessionDb from "./database/sessionDb";
import {routerLogin} from "./routers/routerLogin";
import {middlewareFlashMessage} from "./utilities/middelwareFlashMessage";
import {middlewareUserAutho} from "./utilities/middlewareUserAutho";
import {getAllMovies, updateById} from "./database/querys";
import {routerHome} from "./routers/routerHome";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);
app.use(sessionDb);
app.use(middlewareFlashMessage);

app.use("/login", routerLogin());
app.use("/", routerHome());

app.listen(app.get("port"), async () => {
  try {
    await initDB();
    console.log("Server started on http://localhost:" + app.get("port"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
