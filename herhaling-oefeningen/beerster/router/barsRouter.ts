import express from "express";
import {getBarById, getBars} from "../database";

export function barsRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const bars = await getBars();

    res.render("bars", {
      bars: bars,
    });
  });

  router.get("/:id", async (req, res) => {
    const id =
      typeof req.params.id === "string" ? parseInt(req.params.id) : undefined;

    try {
      if (!id) throw new Error("Bar Id param is empty");
      const barById = await getBarById(id);

      if (!barById) throw new Error("Bar by Id not found");

      res.render("bar", {
        bar: barById,
      });
    } catch (error) {
      console.error(error);
      res.redirect("/bars");
    }
  });

  return router;
}
