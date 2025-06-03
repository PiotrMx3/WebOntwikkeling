import express from "express";
import {getBeerById, getBeers, getCheckinsByBeer} from "../database";

export function beersRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const beers = await getBeers();

    res.render("beers", {
      beers: beers,
    });
  });

  router.get("/:id", async (req, res) => {
    const id =
      typeof req.params.id === "string" ? parseInt(req.params.id) : undefined;

    try {
      if (!id) throw new Error("Beer Id param is empty");
      const beerById = await getBeerById(id);
      if (!beerById) throw new Error("Beer by id not found");

      const chekinByBeer = await getCheckinsByBeer(beerById.name);

      res.render("beer", {
        beer: beerById,
        chekIns: chekinByBeer,
      });
    } catch (error) {
      console.error(error);
      res.redirect("/beers");
    }
  });

  return router;
}
