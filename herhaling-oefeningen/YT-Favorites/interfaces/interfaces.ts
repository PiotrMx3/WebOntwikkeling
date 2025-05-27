import {ObjectId} from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  password?: string;
}

export interface MoviesFetch {
  videos: {
    title: string;
    url: string;
    description: string;
    rating: number;
    fav: 0 | 1;
  }[];
}

export interface MoviesToDb {
  title: string;
  url: string;
  description: string;
  rating: number;
  fav: 0 | 1;
}
