// import express, { Express } from "express";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();

// const app : Express = express();

// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.set("views", path.join(__dirname, "views"));

// app.set("port", process.env.PORT ?? 3000);

// app.get("/contact", (req, res) => {
//     res.render("index", {
//         title: "Contact Form",
//         message: "",
//         messageClass: "",
//         fields: req.body
//     });
// });

// app.post("/contact", (req, res) => {

//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const messageField = req.body.message;
//     const terms = req.body.terms;

//     let missingfields: string[] = [];

//     if(!firstName || firstName.trim() === "") missingfields.push("First Name cannot be empty!");
//     if(!lastName || lastName.trim() === "") missingfields.push("Last Name cannot be empty!");
//     if(!messageField || messageField.trim() === "") missingfields.push("Message Field cannot be empty!");
//     if(!email || !email.includes("@") || email.trim() === "") missingfields.push("E-mail can not be empty!");
//     if(!terms) missingfields.push("You must agree to the terms and conditions ");

//     if(missingfields.length > 0) {
//         res.render("index",{
//             title: "Contact Form",
//             message: missingfields,
//             messageClass: "error",
//             fields: req.body
//         });
//         console.log(req.body);
//     }
//     else {
//         const msgOut = [`Than you for contacting us, ${firstName}! We will get back to you on the following email: ${email}`];

//         res.render("index",{
//             title: "Contact Form",
//             message: msgOut,
//             messageClass: "succes",
//             fields: req.body
//         });
//     }

// });

// app.listen(app.get("port"), () => {
//     console.log("Server started on http://localhost:" + app.get("port"));
// });

import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("port", process.env.PORT || 3000);

app.get("/contact", (req, res) => {
  res.render("index", {
    success: undefined,
    error: undefined,
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });
});

function assertNotEmpty(value: string, errorMessage: string) {
  if (value === "") {
    throw new Error(errorMessage);
  }
}

function assertTrue(value: boolean, errorMessage: string) {
  if (!value) {
    throw new Error(errorMessage);
  }
}

app.post("/contact", (req, res) => {
  let agree: boolean = req.body.agree === "agree";
  let firstname: string = req.body.firstname;
  let lastname: string = req.body.lastname;
  let email: string = req.body.email;
  let message: string = req.body.message;

  try {
    assertTrue(agree, "You must agree to the terms and conditions");
    assertNotEmpty(firstname, "First name cannot be empty!");
    assertNotEmpty(lastname, "Last name cannot be empty!");
    assertNotEmpty(email, "Email cannot be empty!");
    assertNotEmpty(message, "Message cannot be empty!");

    res.render("index", {
      success: `Thank you for contacting us, ${firstname}! We will get back to you on the following email: ${email}`,
      error: undefined,
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    });
  } catch (e: any) {
    res.render("index", {
      success: undefined,
      error: e.message,
      firstname: firstname,
      lastname: lastname,
      email: email,
      message: message,
    });
  }
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
