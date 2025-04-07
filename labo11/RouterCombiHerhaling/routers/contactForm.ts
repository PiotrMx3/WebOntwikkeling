import express from "express";
const router = express.Router();

function contactFormRouter() {
  router.get("/", (req, res) => {
    res.render("contactForm/index", {
      title: "Contact Form",
      message: "",
      messageClass: "",
      fields: req.body,
    });
  });

  router.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const messageField = req.body.message;
    const terms = req.body.terms;

    let missingfields: string[] = [];

    if (!firstName || firstName.trim() === "")
      missingfields.push("First Name cannot be empty!");
    if (!lastName || lastName.trim() === "")
      missingfields.push("Last Name cannot be empty!");
    if (!messageField || messageField.trim() === "")
      missingfields.push("Message Field cannot be empty!");
    if (!email || !email.includes("@") || email.trim() === "")
      missingfields.push("E-mail can not be empty!");
    if (!terms)
      missingfields.push("You must agree to the terms and conditions ");

    if (missingfields.length > 0) {
      res.render("contactForm/index", {
        title: "Contact Form",
        message: missingfields,
        messageClass: "error",
        fields: req.body,
      });
      console.log(req.body);
    } else {
      const msgOut = [
        `Than you for contacting us, ${firstName}! We will get back to you on the following email: ${email}`,
      ];

      res.render("contactForm/index", {
        title: "Contact Form",
        message: msgOut,
        messageClass: "succes",
        fields: req.body,
      });
    }
  });
  return router;
}

export default contactFormRouter;
