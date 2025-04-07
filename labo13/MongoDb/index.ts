import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {MongoClient, ObjectId} from "mongodb";
dotenv.config();

interface Pokemon {
  id?: ObjectId;
  name: string;
  age: number;
}

const pokemons: Pokemon[] = [
  {name: "bulbasaur", age: 7},
  {name: "charmander", age: 8},
  {name: "squirtle", age: 9},
  {name: "jigglypuff", age: 6},
  {name: "meowth", age: 10},
  {name: "psyduck", age: 11},
  {name: "snorlax", age: 30},
  {name: "mewtwo", age: 50},
  {name: "magikarp", age: 3},
  {name: "eevee", age: 5},
  {name: "machop", age: 13},
  {name: "gastly", age: 99},
  {name: "pidgey", age: 4},
  {name: "geodude", age: 12},
  {name: "abra", age: 8},
  {name: "alakazam", age: 35},
  {name: "gengar", age: 40},
  {name: "onix", age: 25},
  {name: "rattata", age: 2},
  {name: "lapras", age: 28},
];

const uri: string = process.env.MONGO_URI || "";

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();

    let data = await client
      .db("MyData")
      .collection("Oefeningen")
      .find<Pokemon>({name: {$in: ["pikachu", "snorlax"]}})
      .toArray();

    console.log(data);

    // let data = await client
    //   .db("MyData")
    //   .collection("Oefeningen")
    //   .find<Pokemon>({age: {$gte: 20}})
    //   .toArray();

    // data.sort((a, b) => a.age - b.age);

    // console.log(data);

    // let data = await client
    //   .db("MyData")
    //   .collection("Oefeningen")
    //   .findOne<Pokemon>({name: "charmander"});
    // console.log(data);

    // let data = await client
    //   .db("MyData")
    //   .collection("Oefeningen")
    //   .findOne<Pokemon>({_id: new ObjectId("67f2b21b6822e3c0cfc70ace")});
    // console.log(data);

    //   let data = await client
    //   .db("MyData")
    //   .collection("Oefeningen")
    //   .find<Pokemon>({});
    // console.log(data);

    // const result = await client
    //   .db("MyData")
    //   .collection("Oefeningen")
    //   .insertMany(pokemons);
    // console.log(result.insertedCount);

    console.log("connected");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    console.log("disonnected");
  }
}

main();

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello World",
    message: "Hello World",
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
