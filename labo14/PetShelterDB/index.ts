import {MongoClient, ObjectId} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

async function initDb() {
  const uri = process.env.MONGO_URI || "";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.log(error);
    return null;
  }
}

interface Pet {
  name: string;
  age: number;
  type: string;
  breed: string;
}

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

async function main() {
  const client = await initDb();

  if (client === null) return console.log("Cannot connect with DataBase");

  try {
    // await insertManyPets(client, pets);
    // await removeFromCollection(client);

    const petsTypes = await petsByType(client, "Dog");
    petsTypes === null
      ? console.log("no search result available")
      : printPets(petsTypes);

    const petsByTwoTypes = await petsByTwoType(client, "Dog", "Cat");
    petsByTwoTypes === null
      ? console.log("no search result available")
      : printPets(petsByTwoTypes);

    const petsByAge = await ageBetween(client, 2, 4);
    petsByAge === null
      ? console.log("no search result available")
      : printPets(petsByAge);

    const petsByIndex = await indexText(client, "retriever");
    petsByIndex === null
      ? console.log("no search result available")
      : printPets(petsByIndex);

    const sortAge = await sortByAge(client, -1);
    sortAge === null
      ? console.log("no search result available")
      : printPets(sortAge);

    const oldest = await theOldest(client);
    oldest === null
      ? console.log("no search result available")
      : printPets(oldest);

    const sixAndTen = await fromSixToTen(client);
    sixAndTen === null
      ? console.log("no search result available")
      : printPets(sixAndTen);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
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

async function ageBetween(client: MongoClient, ageOne: number, ageTwo: number) {
  try {
    const result = await client
      .db("exercises")
      .collection("pets")
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

async function petsByType(client: MongoClient, type: string) {
  try {
    const result = await client
      .db("exercises")
      .collection("pets")
      .find<Pet>({type: new RegExp(type, "i")})
      .toArray();
    console.log(`All pets in collection of the type \`${type}\` `);
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

function printPets(pets: Pet[]) {
  pets.forEach((el) => {
    console.log(
      `${el.name.padEnd(10)} ${el.type.padEnd(10)} ${el.breed.padEnd(20)} ${
        el.age
      }`
    );
  });
}

main();

export {};
