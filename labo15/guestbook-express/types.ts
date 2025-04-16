import {ObjectId} from "mongodb";

export interface GuestBookEntry {
  _id?: ObjectId;
  name: string;
  message: string;
  date: Date;
}

export interface FormattedEntry {
  _id?: ObjectId;
  name: string;
  message: string;
  date: Date;
  formattedDate: string;
}
