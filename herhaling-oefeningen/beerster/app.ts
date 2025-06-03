import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, {Express} from "express";
import path from "path";
import {flashMiddleware} from "./middleware/flashMiddleware";
import utilMiddleware from "./middleware/utilMiddleware";
import session from "./session";
import loginRouter from "./router/loginRouter";
import homeRouter from "./router/homeRouter";
import {loginMiddleware} from "./middleware/loginMiddleware";
import {beersRouter} from "./router/beersRouter";
import {barsRouter} from "./router/barsRouter";
import profileRouter from "./router/profileRouter";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(session);
app.use(flashMiddleware);
app.use(cookieParser());
app.use(utilMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.use("/login", loginRouter());

app.use("/", loginMiddleware, homeRouter());
app.use("/beers", loginMiddleware, beersRouter());
app.use("/bars", loginMiddleware, barsRouter());
app.use("/profile", loginMiddleware, profileRouter());

export default app;
