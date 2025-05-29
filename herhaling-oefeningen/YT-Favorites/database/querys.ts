import {collectionYtMovies} from "./mongoClient";
import {MoviesToDb} from "../types/types";
import {ObjectId} from "mongodb";

export async function updateById(id: string) {
  const movie = await collectionYtMovies.findOne<MoviesToDb>({
    _id: new ObjectId(id),
  });

  if (!movie) return;

  movie.fav = movie.fav === 1 ? 0 : 1;
  await collectionYtMovies.updateOne(
    {_id: new ObjectId(id)},
    {$set: {fav: movie.fav}}
  );
}

export async function getAllMovies(
  q: string,
  field: string,
  direction: string
) {
  const config = q === "" ? {} : {title: new RegExp(q, "i")};
  const dir = direction === "asc" ? 1 : -1;
  let cursor = collectionYtMovies.find<MoviesToDb>(config);

  if (field) cursor = cursor.sort({[field]: dir});

  const result = await cursor.toArray();

  return result;
}
