import dotenv from "dotenv";
import {cpSync} from "fs";
import {Collection, MongoClient} from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("Undefined String Mongo DB");

const client = new MongoClient(uri);

interface Pet {
  name: string;
  age: number;
  type: string;
  breed: string;
}

const collectionPet: Collection<Pet> = client
  .db("exercises")
  .collection<Pet>("dieren");

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

async function initDb() {
  try {
    await client.connect();
    await collectionPet.deleteMany({});
    await collectionPet.insertMany(pets);

    console.log("All pets in the collection of the type 'dog': ");
    const dogs = await collectionPet.find({type: "dog"}).toArray();
    printPets(dogs);

    console.log("All pets in the collection of the type 'dog' or 'cat': ");
    const dogCat = await collectionPet
      .find({type: {$in: ["dog", "cat"]}})
      .toArray();
    printPets(dogCat);

    console.log("All pets in the collection of the type 'dog' or 'cat': ");

    const dogOrCats = await collectionPet
      .find({
        $or: [{type: "dog"}, {type: "cat"}],
      })
      .toArray();

    printPets(dogOrCats);

    console.log(
      "All pets in the collection that are between 2 and 4 years old: "
    );
    const ageBetween = await collectionPet
      .find({$and: [{age: {$gte: 2}}, {age: {$lte: 4}}]})
      .toArray();

    printPets(ageBetween);

    await collectionPet.dropIndex("*");
    await collectionPet.createIndex({breed: "text"});

    console.log("All pets that have 'Retriever' in their breed: ");
    const search = await collectionPet
      .find({$text: {$search: "Retriever"}})
      .toArray();
    printPets(search);

    console.log("All pets sorted by age in ascending order: ");
    const petsByAsc = await collectionPet.find({}).sort({age: 1}).toArray();

    printPets(petsByAsc);

    console.log("All pets sorted by name in descending order: ");
    const petsNameByDesc = await collectionPet
      .find({})
      .sort({name: -1})
      .collation({locale: "en"})
      .toArray();

    printPets(petsNameByDesc);

    console.log("The oldest pet in the collection: ");
    const oldestPet = await collectionPet
      .find({})
      .sort({age: -1})
      .limit(1)
      .toArray();

    printPets(oldestPet);

    console.log("The 6th to 10th youngest pets in the collection: ");

    const fiveAndTen = await collectionPet
      .find({})
      .sort({age: 1})
      .skip(5)
      .limit(5)
      .toArray();

    printPets(fiveAndTen);

    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("Disconnected from DB");
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

initDb();
