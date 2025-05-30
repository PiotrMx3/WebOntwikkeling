import {collectionYtMovies} from "./mongoClient";
import {MoviesToDb, RawMoviesToDb} from "../types/types";
import {ObjectId} from "mongodb";

export async function createNewMovie(body: RawMoviesToDb) {
  let {title, url, description, rating, fav} = body;

  const parsedFav = parseInt(fav, 10);
  const parsedRating = parseInt(rating, 10);

  if (parsedFav !== 1 && parsedFav !== 0)
    throw new Error("Fav is not in rigth type");

  if (isNaN(parsedRating)) throw new Error("Rating is NAN");

  const payload: MoviesToDb = {
    title: title,
    url: url,
    description: description,
    rating: parsedRating,
    fav: parsedFav,
  };

  const result = await collectionYtMovies.insertOne(payload);
  return result;
}

export async function updateById(id: string) {
  const movie = await collectionYtMovies.findOne<MoviesToDb>({
    _id: new ObjectId(id),
  });

  if (!movie) throw new Error("Movie not found");
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
