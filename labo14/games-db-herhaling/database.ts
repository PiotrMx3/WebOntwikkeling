import {Collection, MongoClient} from "mongodb";
import dotenv from "dotenv";
import {Game} from "./types";
import {emit} from "process";
dotenv.config();

const client = getMongoClient();

const collectionGames: Collection<Game> = client
  .db("exercises")
  .collection<Game>("gamesherhaling");

async function exit() {
  try {
    await client.close();
    console.log("Dissconnected from DB");
    process.exit(0);
  } catch (error) {
    console.error("Error in exit", error);
    process.exit(1);
  }
}

async function initDb() {
  try {
    await client.connect();
    await seed();
    await showAllGames();
    await showGamesByPublisher("Sony Interactive Entertainment");
    await showGamesCheaperThan(40);
    await showAllGamesSort("name");
    await showHighestRatedGame();
    await showGamesWithPriceBetween(40, 50);
    await discountAllGames(20);
    await deleteAllGames();

    process.on("SIGINT", exit);
    console.log("Connected to Db");
  } catch (error) {
    console.log("Error in initDb: ", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("Disconnected from Db");
  }
}

initDb();

async function deleteAllGames() {
  await collectionGames.deleteMany({});
  const result = await collectionGames.find<Game>({}).toArray();

  console.table(tableMapping(result));
}

async function discountAllGames(discount: number) {
  const result = await collectionGames.find<Game>({}).toArray();
  const afterDiscount = result.map((el) => {
    const discountPrice = el.price * (discount / 100);

    return {
      ...el,
      price: parseFloat((el.price - discountPrice).toFixed(2)),
    };
  });

  console.table(tableMapping(afterDiscount));
}

async function showGamesWithPriceBetween(min: number, max: number) {
  const result = await collectionGames
    .find<Game>({$and: [{price: {$gte: 20}}, {price: {$lte: 50}}]})
    .toArray();
  console.table(tableMapping(result));
}

async function showHighestRatedGame() {
  const result = await collectionGames
    .find<Game>({})
    .sort({rating: -1})
    .limit(1)
    .toArray();
  console.table(tableMapping(result));
}

type Sort = "name" | "price" | "releaseDate" | "rating";

async function showAllGamesSort(sort: Sort) {
  const result = await collectionGames
    .find<Game>({})
    .sort({[sort]: 1})
    .toArray();
  console.table(tableMapping(result));
}

async function showGamesByPublisher(publisher: string) {
  const result = await collectionGames
    .find<Game>({publisher: new RegExp(publisher, "i")})
    .toArray();
  console.table(tableMapping(result));
}

async function showGamesCheaperThan(price: number) {
  const result = await collectionGames
    .find<Game>({price: {$lte: price}})
    .toArray();
  console.table(tableMapping(result));
}

async function showAllGames() {
  const result = await collectionGames.find<Game>({}).toArray();
  console.table(tableMapping(result));
}

function tableMapping(games: Game[]) {
  const mapping = games.map((el) => {
    return {
      name: el.name,
      price: el.price,
      releaseDate: el.releaseDate,
      rating: el.rating,
    };
  });

  return mapping;
}

async function seed() {
  const games: Game[] = [
    {
      name: "The Witcher 3: Wild Hunt",
      price: 39.99,
      releaseDate: new Date("2015-05-19"),
      rating: 9.3,
      publisher: "CD Projekt",
    },
    {
      name: "Red Dead Redemption 2",
      price: 59.99,
      releaseDate: new Date("2018-10-26"),
      rating: 9.7,
      publisher: "Rockstar Games",
    },
    {
      name: "The Legend of Zelda: Breath of the Wild",
      price: 59.99,
      releaseDate: new Date("2017-03-03"),
      rating: 9.6,
      publisher: "Nintendo",
    },
    {
      name: "The Elder Scrolls V: Skyrim",
      price: 39.99,
      releaseDate: new Date("2011-11-11"),
      rating: 9.5,
      publisher: "Bethesda Softworks",
    },
    {
      name: "The Last of Us Part II",
      price: 59.99,
      releaseDate: new Date("2020-06-19"),
      rating: 9.2,
      publisher: "Sony Interactive Entertainment",
    },
    {
      name: "God of War",
      price: 39.99,
      releaseDate: new Date("2018-04-20"),
      rating: 9.4,
      publisher: "Sony Interactive Entertainment",
    },
    {
      name: "Dark Souls III",
      price: 59.99,
      releaseDate: new Date("2016-04-12"),
      rating: 9.1,
      publisher: "FromSoftware",
    },
    {
      name: "Grand Theft Auto V",
      price: 29.99,
      releaseDate: new Date("2013-09-17"),
      rating: 9.8,
      publisher: "Rockstar Games",
    },
  ];

  if ((await collectionGames.countDocuments()) === 0) {
    await collectionGames.insertMany(games);
    console.log("Database Empty: Seeding records");
  }
}

function getMongoClient() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("URI not defined in .env file");
    process.exit(1);
  }

  return new MongoClient(uri);
}
