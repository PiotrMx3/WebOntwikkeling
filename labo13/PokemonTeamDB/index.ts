import readline from "readline-sync";
import {MongoClient, ObjectId} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

let pokemon: string[] = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
];

interface TeamPokemon {
  _id?: ObjectId;
  pokemon: string;
}

async function main() {
  let team: string[] = [];
  let running = true;

  for (let i = 0; i < pokemon.length; i++) {
    console.log(`${i}. ${pokemon[i]}`);
  }

  do {
    let input: string = readline.question(
      "Welke pokemon wil je in je team? [0-20]: "
    );

    if (input.toUpperCase() === "STOP") {
      running = false;
    } else {
      let index: number = parseInt(input);

      if (index < 0 || index >= pokemon.length) {
        console.log("Deze pokemon ken ik niet");
      } else {
        const exist = await pokeTeamIncludePokemon(client, pokemon[index]);
        if (exist) {
          console.log("Deze pokemon zit al in je team");
        } else {
          await addPokemon(client, pokemon[index]);
          //   team.push(pokemon[index]);
        }
      }
    }
  } while (running);

  console.log("Jouw team van pokemon is: ");
  for (let i = 0; i < team.length; i++) {
    console.log(`${i + 1}. ${team[i]}`);
  }
}

async function pokeTeamIncludePokemon(client: MongoClient, pokemon: string) {
  try {
    await client.connect();
    const result = await client
      .db("exercises")
      .collection("poke-team")
      .findOne<TeamPokemon>({pokemon: pokemon});
    console.log(Boolean(result));
    return result;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

async function addPokemon(client: MongoClient, pokemon: string) {
  const poke: TeamPokemon = {
    pokemon,
  };

  try {
    await client.connect();
    await client.db("exercises").collection("poke-team").insertOne(poke);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();

export {};
