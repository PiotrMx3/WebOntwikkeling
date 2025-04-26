import {ObjectId} from "mongodb";

export interface Game {
  _id?: ObjectId;
  name: string;
  price: number;
  releaseDate: Date;
  rating: number;
  publisher: string;
}
