import readline from "readline-sync";
import {MongoClient, ObjectId} from "mongodb";
import dotenv from "dotenv";
import {findSourceMap} from "module";
dotenv.config();

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
  const uri = process.env.MONGO_URI || "";
  const client = new MongoClient(uri);

  try {
    await client.connect();

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

    const pokeTeam = await showPokemonTeam(client);

    if (pokeTeam !== null) {
      console.log("Jouw team van pokemon is: ");
      pokeTeam.forEach((el, i) => {
        console.log(`${i + 1}. ${el.pokemon}`);
      });
    } else {
      console.log("Er zijn pokemon's in jouw team !");
    }

    // for (let i = 0; i < team.length; i++) {
    //   console.log(`${i + 1}. ${team[i]}`);
    // }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

async function showPokemonTeam(client: MongoClient) {
  try {
    const cursor = client
      .db("exercises")
      .collection("poke-team")
      .find<TeamPokemon>({});

    const result = await cursor.toArray();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function pokeTeamIncludePokemon(client: MongoClient, pokemon: string) {
  try {
    const result = await client
      .db("exercises")
      .collection("poke-team")
      .findOne<TeamPokemon>({pokemon: pokemon});

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addPokemon(client: MongoClient, pokemon: string) {
  const poke: TeamPokemon = {
    pokemon,
  };

  try {
    await client.db("exercises").collection("poke-team").insertOne(poke);
  } catch (error) {
    console.error(error);
  }
}

main();
