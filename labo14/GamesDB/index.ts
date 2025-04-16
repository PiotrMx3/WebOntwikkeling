import {Db, MongoClient, ObjectId} from "mongodb";
import dotenv from "dotenv";
import {findSourceMap} from "module";
import {log} from "console";

dotenv.config();

async function initDB() {
  const uri = process.env.MONGO_URI || "";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return client;
  } catch (error) {
    console.log("error in initDB", error);
    return null;
  }
}

interface Game {
  _id?: ObjectId;
  name: string;
  price: number;
  releaseDate: Date;
  rating: number;
  publisher: string;
}

interface GameView {
  name: string;
  price: number;
  releaseDate: Date;
  rating: number;
}

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

async function main() {
  const client = await initDB();
  if (client === null) return console.log("Cannot connect with DataBase");

  const dbName = "exercises";
  const collectionName = "gamesDB";
  const db = client.db(dbName);

  try {
    await createGamesCollection(db, collectionName);
    // await showAllGames(db, collectionName, "rating");
    // await discountAllGames(db, collectionName, 20);
    // await showGamesWithPriceBetween(db, collectionName, 20, 40);
    // await showAllGames(db, collectionName, "price");
    // await showAllGames(db, collectionName, "releaseDate");
    // await showHighestRatedGame(db, collectionName);
    // await showGamesCheaperThan(db, collectionName, 40);
    // await deletAllGames(db, collectionName);
  } catch (error) {
    console.log("error in main", error);
  } finally {
    await client.close();
    console.log("Disconnected");
  }
}

main();

async function deletAllGames(db: Db, collectionName: string) {
  try {
    const games = await db.collection(collectionName).deleteMany({});
    await db.collection(collectionName).drop();
    console.log("Record removed: ", games.deletedCount);
  } catch (error) {
    console.log("Error in deletAllGames ", error);
  }
}

async function discountAllGames(
  db: Db,
  collectionName: string,
  precentage: number
) {
  try {
    const games = await db.collection(collectionName).find<Game>({}).toArray();

    if (!games.length) {
      console.log("No item's found !");
      return;
    }

    const result: GameView[] = games.map((el) => {
      return {
        name: el.name,
        price: Number((el.price - el.price * (precentage / 100)).toFixed(2)),
        releaseDate: el.releaseDate,
        rating: el.rating,
      };
    });

    console.table(result);
  } catch (error) {
    console.log("Error in discountAllGames: ", error);
  }
}

async function showGamesWithPriceBetween(
  db: Db,
  collectionName: string,
  min: number,
  max: number
) {
  try {
    const games = await db
      .collection(collectionName)
      .find<Game>({$and: [{price: {$gt: min}}, {price: {$lt: max}}]})
      .toArray();

    if (!games.length) {
      console.log("No items found");
      return;
    }

    const result: GameView[] = games.map((el) => {
      return {
        name: el.name,
        price: el.price,
        releaseDate: el.releaseDate,
        rating: el.rating,
      };
    });

    console.table(result);
  } catch (error) {
    console.log("Error in showGamesWithPriceBetween: ", error);
  }
}

async function showHighestRatedGame(db: Db, collectionName: string) {
  try {
    const games = await db
      .collection(collectionName)
      .find({})
      .sort({rating: -1})
      .limit(1)
      .toArray();

    if (!games.length) {
      console.log("No rating found !");
      return;
    }

    const result: GameView[] = games.map((el) => {
      return {
        name: el.name,
        price: el.price,
        releaseDate: el.releaseDate,
        rating: el.rating,
      };
    });

    console.table(result);
  } catch (error) {
    console.log("Error in showHighestRatedGame", error);
  }
}

async function showGamesCheaperThan(
  db: Db,
  collectionName: string,
  price: number
) {
  try {
    const games = await db
      .collection(collectionName)
      .find({price: {$lt: price}})
      .toArray();

    if (!games.length) {
      console.log("No games found cheaper then: ", price);
      return;
    }

    const result: GameView[] = games.map((el) => {
      return {
        name: el.name,
        price: el.price,
        releaseDate: el.releaseDate,
        rating: el.rating,
      };
    });

    console.table(result);
  } catch (error) {
    console.log("Error in showGamesCheaperThan:", error);
  }
}

async function showGamesByPublisher(
  db: Db,
  collectionName: string,
  publisher: string
) {
  try {
    const games = await db
      .collection(collectionName)
      .find<Game>({publisher: publisher})
      .toArray();

    if (!games.length) {
      console.log("No publisher found");
      return;
    }

    const result: GameView[] = games.map((el) => {
      return {
        name: el.name,
        price: el.price,
        releaseDate: el.releaseDate,
        rating: el.rating,
      };
    });
    console.table(result);
  } catch (error) {
    console.log("Error in showGamesByPublisher:", error);
  }
}

async function showAllGames(
  db: Db,
  collectionName: string,
  field: string,
  direction: 1 | -1 = 1
) {
  try {
    const games = await db
      .collection(collectionName)
      .find<Game>({})
      .collation({locale: "en"})
      .sort({[field]: direction})
      .toArray();

    if (!games.length) {
      console.log("No games found");
      return;
    }

    const result: GameView[] = games.map((el) => {
      return {
        name: el.name,
        price: el.price,
        releaseDate: el.releaseDate,
        rating: el.rating,
      };
    });
    console.table(result);
  } catch (error) {
    console.log("Error in showAllGames:", error);
  }
}

async function createGamesCollection(db: Db, collectionName: string) {
  try {
    const listCol = await db.listCollections().toArray();
    const exist = listCol.find((el) => el.name === collectionName);

    if (!exist) {
      const result = await db.collection(collectionName).insertMany(games);
      console.log("Added records:", result.insertedCount);
    } else {
      console.log("Collection already exists!");
    }
  } catch (error) {
    console.log("Error in createGamesCollection:", error);
  }
}

export {};
