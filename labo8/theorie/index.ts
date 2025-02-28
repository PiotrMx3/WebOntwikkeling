import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

// dotenv.config();

const app : Express = express();

app.set("port", 3000);


app.get("/", (req,res) => {
res.type("text/html");
res.send("Hello <strong>World</strong>");
});




// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.set("views", path.join(__dirname, "views"));

// app.set("port", process.env.PORT ?? 3000);

app.use((req,res) => {
    res.type("text/html");
    res.status(404);
    res.send("Error 404");
});


app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});

