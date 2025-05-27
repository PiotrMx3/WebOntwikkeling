import {ObjectId} from "mongodb";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  password?: string;
}

export interface Flash {
  type: "success" | "error";
  message: string;
}
