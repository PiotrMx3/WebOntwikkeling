import bcrypt from "bcrypt";
import {collectionUsers} from "./mongoClient";
import {User} from "../types/types";

export async function loginDb(email: string, password: string) {
  if (email === "" && password === "")
    throw new Error("Email and Paswoord cannot be empty!");

  const user: User | null = await collectionUsers.findOne<User>({email: email});

  if (user) {
    const valid = await bcrypt.compare(password, user.password!);
    if (valid) {
      return user;
    } else {
      throw new Error("PW is wrong !");
    }
  } else {
    throw new Error("User don't exist");
  }
}
