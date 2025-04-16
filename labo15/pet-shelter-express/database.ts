import {Collection, MongoClient, ObjectId} from "mongodb";
import {Pet} from "./types";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI ?? "");

export const petsCollection: Collection<Pet> = client
  .db("exercises")
  .collection<Pet>("pets");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
}

export async function innitDb() {
  try {
    await client.connect();
    console.log("Connected to database");
    await seed();
    await petsCollection.createIndex(
      {
        name: "text",
        type: "text",
        breed: "text",
      },
      {default_language: "none"}
    );
    process.on("SIGINT", exit);
  } catch (error) {
    console.log(error);
  }
}

async function seed() {
  const pets: Pet[] = [
    {name: "Buddy", age: 2, type: "dog", breed: "Golden Retriever"},
    {name: "Daisy", age: 3, type: "dog", breed: "Beagle"},
    {name: "Coco", age: 1, type: "dog", breed: "Poodle"},
    {name: "Charlie", age: 2, type: "cat", breed: "Siamese"},
    {name: "Luna", age: 3, type: "cat", breed: "Persian"},
    {name: "Lucy", age: 1, type: "cat", breed: "Maine Coon"},
    {name: "Max", age: 4, type: "dog", breed: "Labrador Retriever"},
    {name: "Bella", age: 2, type: "dog", breed: "French Bulldog"},
    {name: "Milo", age: 1, type: "dog", breed: "Border Collie"},
    {name: "Oliver", age: 3, type: "cat", breed: "Bengal"},
    {name: "Tiger", age: 2, type: "cat", breed: "Ragdoll"},
    {name: "Zoe", age: 3, type: "cat", breed: "Sphynx"},
    {name: "Sophie", age: 5, type: "dog", breed: "Dachshund"},
    {name: "Lily", age: 1, type: "cat", breed: "British Shorthair"},
    {name: "Oscar", age: 4, type: "dog", breed: "Boxer"},
    {name: "Ruby", age: 2, type: "dog", breed: "Siberian Husky"},
    {name: "Rosie", age: 2, type: "cat", breed: "Scottish Fold"},
    {name: "Jack", age: 3, type: "dog", breed: "Cocker Spaniel"},
    {name: "Sadie", age: 2, type: "dog", breed: "Rottweiler"},
    {name: "Maggie", age: 1, type: "dog", breed: "Shih Tzu"},
  ];

  if ((await petsCollection.countDocuments()) === 0) {
    await petsCollection.insertMany(pets);
  }
}

async function fromSixToTen(client: MongoClient) {
  try {
    const result = await client
      .db("exercises")
      .collection<Pet>("pets")
      .find({})
      .sort({age: 1})
      .skip(5)
      .limit(5)
      .toArray();

    console.log("The oldest pet in the collection: ");

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function theOldest(client: MongoClient) {
  try {
    const result = await client
      .db("exercises")
      .collection<Pet>("pets")
      .find({})
      .sort({age: -1})
      .limit(1)
      .toArray();

    console.log("The oldest pet in the collection: ");

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function sortByAge(client: MongoClient, direction: 1 | -1) {
  try {
    const result = await client
      .db("exercises")
      .collection<Pet>("pets")
      .find({})
      .sort({age: direction})
      .toArray();

    direction === 1
      ? console.log("All pets sorted by age in ascending order: ")
      : console.log("All pets sorted by age in descending order: ");

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function indexText(client: MongoClient, text: string) {
  try {
    await client
      .db("exercises")
      .collection("pets")
      .createIndex({breed: "text"});

    const result = await client
      .db("exercises")
      .collection("pets")
      .find<Pet>({$text: {$search: text, $language: "en"}})
      .toArray();
    console.log(`All pets that have \`${text}\` in their breed:`);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function ageBetween(ageOne: number, ageTwo: number) {
  try {
    const result = await petsCollection
      .find<Pet>({
        $and: [{age: {$gte: ageOne}}, {age: {$lte: ageTwo}}],
      })
      .toArray();
    console.log(
      `All pets in the collection that are between \`${ageOne}\` and \`${ageTwo}\` years old: `
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function petsByTwoType(
  client: MongoClient,
  typeOne: string,
  typeTwo: string
) {
  try {
    const result = await client
      .db("exercises")
      .collection("pets")
      .find<Pet>({type: {$in: ["dog", "cat"]}})
      //   .find<Pet>({
      //     $or: [
      //       {type: new RegExp(typeOne, "i")},
      //       {type: new RegExp(typeTwo, "i")},
      //     ],
      //   })
      .toArray();
    console.log(
      `All pets in collection of the type \`${typeOne}\` and \`${typeTwo}\``
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function petsByType(type: string) {
  try {
    const result = await petsCollection
      .find<Pet>({type: new RegExp(type, "i")})
      .toArray();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function removeFromCollection(client: MongoClient) {
  try {
    const result = await client
      .db("exercises")
      .collection("pets")
      .deleteMany({});
    console.log("Verwijderdt Collections: ", result.deletedCount);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function insertManyPets(client: MongoClient, pets: Pet[]) {
  try {
    const pet = await client
      .db("exercises")
      .collection("pets")
      .insertMany(pets);
    console.log(
      "Er zijn in het toaal: ",
      pet.insertedCount,
      " records toegevoedt"
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function petsByIndex(userSearch: string) {
  try {
    const result = await petsCollection
      .find<Pet>({$text: {$search: userSearch}})
      .toArray();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function sortByField(field: string) {
  try {
    const result = await petsCollection
      .find({})
      .sort({[field]: 1})
      .toArray();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function printPets() {
  return await petsCollection.find({}).toArray();
}
