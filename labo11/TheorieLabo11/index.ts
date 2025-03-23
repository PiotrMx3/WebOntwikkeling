import express, {Express} from "express";
import {Request, Response, NextFunction} from "express";
import {errorHandler} from "./middleware/errorHandling";
import dotenv from "dotenv";
import path from "path";
import {register} from "module";

dotenv.config();
let requestLog: Record<string, number> = {};

interface MaxReqConfiug {
  maxReq: number;
}

function maxRequest(config: MaxReqConfiug) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(requestLog);
    if (req.ip) {
      requestLog[req.ip] = requestLog[req.ip] ? requestLog[req.ip] + 1 : 1;
      if (requestLog[req.ip] > config.maxReq) {
        res.status(429).send("Too many requests for this IP address");
        return;
      }
    }
    next();
  };
}

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} ${req.ip} `);
  next();
});

app.use(maxRequest({maxReq: 10}));

app.use((req, res, next) => {
  res.locals.title = "My website";
  next();
});

app.get("/", (req, res) => {
  res.render("index", {
    message: "Hello World",
  });
});

app.get("/error", (req, res, next) => {
  const error = new Error("Test error");
  next(error); // Przekazuje błąd do error handling middleware
});

app.use(errorHandler({statusCode: 500}));

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
