import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { read } from "fs";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/:operator", (req, res) => {
    const data = req.params.operator;

    console.log(req.query.b);

    if(req.query.a === undefined || req.query.b === undefined || req.query.a === "" || req.query.b === "") {
        return res.json(
            {
                error: "Both query parameters (a,b) have to be specified."
            }
        );
    };


    let numA : number = NaN;
    let numB : number = NaN;

    if(typeof req.query.a === "string" && typeof req.query.b === "string") {
        numA = parseInt(req.query.a);
        numB = parseInt(req.query.b);
    }

    if(isNaN(numA) || isNaN(numB)){
        return  res.json({
            error: "Both query parameters (a,b) have to be of type number."
        });
    }
    
    if(data === "add") {
        res.json({
            result: numA + numB
        });
    }
    else if (data === "min") {
        res.json({
            result: numA - numB
        });
    }
    else if (data === "mult") {
        res.json({
            result: numA * numB
        });
    }
    else if (data === "div") {
        if(numB === 0){
            return res.json({
               error: "Division by 0 is not allowed."
            });
        }
        res.json({
            result: numA / numB
        });
    } else {
        res.json({
            error: "Unknown operator."
        });
    }


        // res.type("text/html");
        // res.send(`${!isNaN(numA)} ${!isNaN(numB)}`);

        

    // res.render("index", {
    //     title: "Hello World",
    //     message: "Hello World"
    // })
});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});