import * as jwt from "jsonwebtoken";
import express from "express";
import {login} from "../database";
import dotenv from "dotenv";
import {loginMiddleware} from "../middleware/loginMiddleware";

dotenv.config();

export default function loginRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    res.render("login");
  });

  router.post("/", async (req, res) => {
    const {username, password} = req.body;
    const secret = process.env.JWT_SECRET ?? "my-secret-superjwt";
    try {
      const user = await login(username, password);
      delete user.password;
      const token = jwt.sign(user, secret, {expiresIn: "1d"});
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      res.redirect("/");
    } catch (error) {
      if (error instanceof Error) {
        req.session.message = {type: "error", message: `${error.message}`};
        res.redirect("/login");
      }
    }
  });

  router.get("/logout", loginMiddleware, async (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("jwt");
      res.redirect("/login");
    });
  });

  return router;
}
