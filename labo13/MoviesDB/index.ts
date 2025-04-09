import {MongoClient, ObjectId} from "mongodb";
import dotnev from "dotenv";

dotnev.config();

const uri: string = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

interface Movies {
  _id?: ObjectId;
  name: string;
  myScore: number;
  timesViewed: number;
}

let movies: Movies[] = [
  {name: "The Matrix", myScore: 90, timesViewed: 10},
  {name: "Pulp Fuction", myScore: 100, timesViewed: 100},
  {name: "Monster Hunter", myScore: 5, timesViewed: 1},
  {name: "Blade Runner", myScore: 100, timesViewed: 30},
  {name: "Austin Powers", myScore: 80, timesViewed: 10},
  {name: "Jurasic Park 2", myScore: 40, timesViewed: 1},
  {name: "Ichi the Killer", myScore: 80, timesViewed: 1},
];

async function main() {
  try {
    await client.connect();

    // const insertData = await client
    //   .db("exercises")
    //   .collection("movies")
    //   .insertMany(movies);
    // console.log(insertData.insertedCount);

    // const data = await client
    //   .db("exercises")
    //   .collection("movies")
    //   .findOne<Movies>({});

    const data = await client
      .db("exercises")
      .collection("movies")
      .find<Movies>({})
      .toArray();

    const dataOne = await client
      .db("exercises")
      .collection("movies")
      .findOne<Movies>({});

    console.log("");

    // if !dataOne { niks gevonden } else {...}
    console.log("First movie:");
    console.log(
      `Naam: ${dataOne?.name} Score: ${dataOne?.myScore} Aantal bekijken: ${dataOne?.timesViewed}`
    );

    console.log("");

    console.log("All Movies: ");
    data.forEach((el) => {
      console.log(
        `Naam: ${el.name} Score: ${el.myScore} Aantal bekijken: ${el.timesViewed}`
      );
    });
    console.log("");
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
    console.log("Disconnected");
  }
}

main();
