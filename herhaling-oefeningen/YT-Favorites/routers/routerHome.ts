import express, {Express} from "express";
import {middlewareUserAutho} from "../utilities/middlewareUserAutho";
import {createNewMovie, getAllMovies, updateById} from "../database/querys";

export function routerHome() {
  const router = express.Router();

  router.use(middlewareUserAutho);

  router.get("/", async (req, res) => {
    const q = typeof req.query.q === "string" ? req.query.q : "";
    const field = typeof req.query.field === "string" ? req.query.field : "";
    const direction =
      typeof req.query.direction === "string" ? req.query.direction : "";

    const movies = await getAllMovies(q, field, direction);

    res.render("index", {
      movies: movies,
      q: q,
      field: field,
      direction: direction,
    });
  });

  router.get("/create", async (req, res) => {
    res.render("create");
  });

  router.post("/create", async (req, res) => {
    await createNewMovie(req.body);

    res.redirect("/");
  });

  router.post("/update/:id", async (req, res) => {
    const id = typeof req.params.id === "string" ? req.params.id : "";
    const q = typeof req.query.q === "string" ? req.query.q : "";
    const field = typeof req.query.field === "string" ? req.query.field : "";
    const direction =
      typeof req.query.direction === "string" ? req.query.direction : "";

    try {
      await updateById(id);
      res.redirect(`/?q=${q}&field=${field}&direction=${direction}`);
    } catch (error) {
      if (error instanceof Error) res.status(404).send(`${error.message}`);
    }
  });

  return router;
}
