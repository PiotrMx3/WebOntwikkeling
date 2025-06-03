import dotenv from "dotenv";
import {Collection, MongoClient, Sort} from "mongodb";
import {Bar, Beer, Checkin, CheckinForm, User} from "./types";
import bcrypt from "bcrypt";
import {randomNumber} from "./utilities";
dotenv.config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
export const client = new MongoClient(MONGODB_URI);

const collectionUsers: Collection<User> = client
  .db("beerster")
  .collection<User>("users");

const collectionBeers: Collection<Beer> = client
  .db("beerster")
  .collection<Beer>("beers");

const collectionBars: Collection<Bar> = client
  .db("beerster")
  .collection<Bar>("bars");

const collectionCheckIn: Collection<Checkin> = client
  .db("beerster")
  .collection<Checkin>("chekin");

const initialUsers: User[] = [
  {
    username: "solo",
    fullname: "Han Solo",
    password: "hanshotfirst",
  },
  {
    username: "princess",
    fullname: "Leia Organa",
    password: "obiwan",
  },
];

export async function exit() {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

export async function login(username: string, password: string) {
  if (username === "" || password === "") {
    throw new Error("Email and password required");
  }
  let user: User | null = await collectionUsers.findOne<User>({
    username: username,
  });
  if (user) {
    if (await bcrypt.compare(password, user.password!)) {
      return user;
    } else {
      throw new Error("Password incorrect");
    }
  } else {
    throw new Error("User not found");
  }
}

async function seedDatabase() {
  const overRide = process.env.OVERRIDE_DB ?? "true";
  if ((await collectionUsers.countDocuments()) > 0 && overRide !== "true") {
    console.log("Db has records");
    return;
  }
  await collectionUsers.deleteMany({});
  await collectionBars.deleteMany({});
  await collectionBeers.deleteMany({});
  await collectionCheckIn.deleteMany({});

  const dataBeers = await fetch(
    "https://raw.githubusercontent.com/slimmii/mock_api/main/beers/beers.json"
  );
  const dataBars = await fetch(
    "https://raw.githubusercontent.com/slimmii/mock_api/main/bars/bars.json"
  );

  const dataCheckRaw = await fetch(
    "https://raw.githubusercontent.com/slimmii/mock_api/main/checkins/checkins.json"
  );

  if (!dataBeers.ok) throw new Error("Error Beer: " + dataBeers.status);
  if (!dataBars.ok) throw new Error("Error Bars: " + dataBars.status);
  if (!dataCheckRaw.ok) throw new Error("Error Check: " + dataCheckRaw.status);

  const beers: Beer[] = await dataBeers.json();
  const bars: Bar[] = await dataBars.json();
  const check: Checkin[] = await dataCheckRaw.json();

  const formattedCheck: Checkin[] = check.map((el) => {
    const barById: Bar | undefined = bars.find((bar) => bar.id === el.barId);
    const beerById: Beer | undefined = beers.find(
      (beer) => beer.id === el.beerId
    );

    if (!beerById) throw new Error("Error: Bar not found");
    if (!barById) throw new Error("Error: Beer not found");

    return {
      ...el,
      bar: barById,
      beer: beerById,
    };
  });

  const promises = initialUsers.map(async (el) => {
    return {
      ...el,
      password: await bcrypt.hash(el.password!, 10),
    };
  });

  const formattedUsers: User[] = await Promise.all(promises);

  const insertUsers = await collectionUsers.insertMany(formattedUsers);
  const insertBars = await collectionBars.insertMany(bars);
  const insertBeers = await collectionBeers.insertMany(beers);
  const insertCheck = await collectionCheckIn.insertMany(formattedCheck);

  console.log(`
  User inserts: ${insertUsers.insertedCount}
  Bars inserts: ${insertBars.insertedCount}
  Beers inserts: ${insertBeers.insertedCount}
  Checkins inserts: ${insertCheck.insertedCount}
  `);
}

export async function getCheckins(
  sort: Sort = {date: 1},
  limit: number | undefined = undefined
) {
  const result = await collectionCheckIn
    .find<Checkin>({})
    .sort(sort)
    .limit(limit ?? 1000)
    .toArray();
  return result;
}

export async function getCheckinsByBar(barName: string) {}

export async function getCheckinsByFullName(fullname: string) {
  const result = await collectionCheckIn
    .find<Checkin>({name: new RegExp(fullname, "i")})
    .sort({date: -1})
    .toArray();
  console.log(result.length);
  return result;
}

export async function getCheckinsByBeer(beerName: string) {
  const result = await collectionCheckIn
    .find<Checkin>({
      ["beer.name"]: new RegExp(beerName, "i"),
    })
    .sort({date: -1})
    .toArray();
  return result;
}

export async function getBars(sort: Sort = {name: 1}) {
  const result = await collectionBars.find({}).sort(sort).toArray();
  return result;
}

export async function getTopThreeBars() {
  const result = collectionBars.find({}).sort({rating: -1}).limit(3).toArray();
  return result;
}

export async function getBeers() {
  const result = await collectionBeers.find({}).toArray();
  return result;
}

export async function getBarById(id: number) {
  const result = await collectionBars.findOne<Bar>({id: id});
  return result;
}

export async function getBeerById(id: number) {
  const result = await collectionBeers.findOne<Beer>({id: id});
  return result;
}

export async function createCheckin(
  barId: number,
  beerId: number,
  comment: string,
  date: Date,
  name: string = "Anonymous"
) {
  const checkins = await getCheckins({id: -1});
  if (!checkins[0].id) throw new Error("Check Id not found");
  const newId = checkins[0].id === 0 ? 1 : checkins[0].id + 1;

  const barById = await getBarById(barId);
  const beerById = await getBeerById(beerId);

  if (!barById || !beerById) throw new Error("Bar or Beer Id not found");

  const imgUrl = barById.images[randomNumber(barById.images)];

  const payload: CheckinForm = {
    barId: barId,
    beerId: beerId,
    comment: comment,
    date: date,
  };

  const formattedCheck: Checkin = {
    id: newId,
    ...payload,
    name: name,
    bar: barById,
    beer: beerById,
    image: imgUrl,
  };
  const result = collectionCheckIn.insertOne(formattedCheck);
  return (await result).acknowledged;
}

export async function connect() {
  try {
    await client.connect();
    console.log("Connected to database");
    await seedDatabase();
    process.on("SIGINT", exit);
  } catch (error) {
    console.error(error);
  }
}
