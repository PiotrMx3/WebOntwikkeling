import express from "express";
import {Beer, Checkin} from "../types";
import {
  createCheckin,
  getBeers,
  getCheckins,
  getTopThreeBars,
} from "../database";

interface BeerWithCount {
  beer: Beer;
  count: number;
}

export function getTopBeers(checkins: Checkin[], beers: Beer[]): Beer[] {
  const beerCheckinCounts = checkins.reduce(
    (acc: Record<number, number>, checkin: Checkin) => {
      const beerId = checkin.beer.id;
      if (!acc[beerId]) {
        acc[beerId] = 0;
      }
      acc[beerId]++;
      return acc;
    },
    {}
  );

  return beers
    .map((beer: Beer) => ({beer, count: beerCheckinCounts[beer.id] ?? 0}))
    .sort((a: BeerWithCount, b: BeerWithCount) => b.count - a.count)
    .map((beerWithCount: BeerWithCount) => beerWithCount.beer)
    .slice(0, 3);
}

export default function homeRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const chekins = await getCheckins({date: -1}, 5);
    const topThreeBars = await getTopThreeBars();
    const topThreeBeers = getTopBeers(await getCheckins(), await getBeers());

    res.render("index", {
      checkin: chekins,
      topBars: topThreeBars,
      topBeers: topThreeBeers,
    });
  });

  router.post("/checkin", async (req, res) => {
    const {barId, beerId, comment} = req.body;
    try {
      const date: Date = new Date();
      const name: string = res.locals.user.fullname;

      const success = await createCheckin(
        parseInt(barId),
        parseInt(beerId),
        comment,
        date,
        name
      );

      if (success)
        req.session.message = {
          type: "success",
          message: "You have successfully cheked in",
        };

      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.redirect("/");
    }
  });

  return router;
}
