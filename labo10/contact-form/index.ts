import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/contact", (req, res) => {
    res.render("index", {
        title: "Contact Form",
        message: "",
        messageClass: "",
        fields: req.body
    });
});


app.post("/contact", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const messageField = req.body.message;
    const terms = req.body.terms;

    let missingfields: string[] = [];


    if(!firstName || firstName.trim() === "") missingfields.push("First Name cannot be empty!");
    if(!lastName || lastName.trim() === "") missingfields.push("Last Name cannot be empty!");
    if(!messageField || messageField.trim() === "") missingfields.push("Message Field cannot be empty!");
    if(!email || !email.includes("@") || email.trim() === "") missingfields.push("E-mail can not be empty!");
    if(!terms) missingfields.push("You must agree to the terms and conditions ");

    if(missingfields.length > 0) {
        res.render("index",{
            title: "Contact Form",
            message: missingfields,
            messageClass: "error",
            fields: req.body 
        });
        console.log(req.body);
    }
    else {
        const msgOut = [`Than you for contacting us, ${firstName}! We will get back to you on the following email: ${email}`];

        res.render("index",{
            title: "Contact Form",
            message: msgOut,
            messageClass: "succes",
            fields: req.body 
        });
    }

});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});