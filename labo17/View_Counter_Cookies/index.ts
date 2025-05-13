import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  const raw: number = req.cookies.count ? parseInt(req.cookies.count, 10) : 0;

  const isFirst = raw === 0;

  const newCount = raw + 1;

  res.cookie("count", newCount.toString(), {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });

  res.render("index", {
    title: "Hello World",
    message: isFirst
      ? "Welkom voor de eerste keer op deze pagina. Kom nog eens terug!"
      : `Welkom terug! Je bezocht deze pagina al ${newCount} keer.`,
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
