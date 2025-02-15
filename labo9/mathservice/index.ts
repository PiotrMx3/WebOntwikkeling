import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { read } from "fs";
import { type } from "os";
import { error } from "console";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);


function perfmedOperator(operator : string, a : number , b : number) {

    if(!["add","min","mult","div"].includes(operator)) throw new Error("Unknown operator.");

    if (isNaN(a) || isNaN(b)) throw new Error("Both query parameters (a,b) have to be of type number.");


    switch (operator) {
        case "add":
            return a + b

        case "min":
            return a - b

        case "mult":
            return a * b   

        case "div":
            if(b === 0) {
                throw new Error("Division by 0 is not allowed."); 
            } 
            else {
                return a / b;
            }
                
        default:
            throw new Error("Unknown operator."); 
    }
    
};


app.get("/:operator", (req, res) => {

    const operator : string = req.params.operator;

    if (req.query.a == null || req.query.b == null) { 
        return res.json({
            error: "Both query parameters (a,b) have to be specified."
        });
    }
        
        const a : number = Number(req.query.a);
        const b : number = typeof req.query.b === "string" ? parseFloat(req.query.b) : NaN;

        try {
          
         const result = perfmedOperator(operator, a, b)   
         res.json({
            result
         })   
        } catch (error: any) {
            res.json({
                error : `Error ${error.message}`
            });
        }

});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});