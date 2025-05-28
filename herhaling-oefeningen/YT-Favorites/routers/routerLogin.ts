import express, {Express} from "express";
import {loginDb} from "../database/loginDb";
import {middlewareLoggedIn} from "../utilities/middlewareLoggedIn";

export function routerLogin() {
  const router = express.Router();

  router.use(middlewareLoggedIn);

  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await loginDb(email, password);
      delete user.password;
      req.session.user = user;
      req.session.flashMessage = {
        type: "succes",
        message: `Welcome you are logged in with ${user.email} `,
      };
      res.redirect("/");
    } catch (error) {
      if (error instanceof Error)
        req.session.flashMessage = {type: "error", message: `${error.message}`};
      res.redirect("/login");
    }
  });

  router.post("/logout", async (req, res) => {
    console.log("hier logout ???");
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });

  return router;
}
