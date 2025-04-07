import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import mathRouter from "./routers/mathservice";
import newsPaperRouter from "./routers/newsPaperRouter";
import contactFormRouter from "./routers/contactForm";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello World",
    message: "Hello World",
  });
});

app.use("/math", mathRouter());
app.use("/newspaper", newsPaperRouter());
app.use("/contactform", contactFormRouter());

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
