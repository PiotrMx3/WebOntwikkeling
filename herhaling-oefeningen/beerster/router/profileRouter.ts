import express from "express";
import {getCheckinsByFullName} from "../database";

export default function profileRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const fullName = res.locals.user.fullname;

    try {
      if (!fullName) throw new Error("Error locals not defined!");

      const checkinByFullname = await getCheckinsByFullName(fullName);
      res.render("profile", {
        checkByUser: checkinByFullname,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });

  return router;
}
