import bcrypt from "bcrypt";
import {collectionUsers} from "./mongoClient";
import {User} from "../interfaces/interfaces";

export async function loginDb(email: string, password: string) {
  if (email === "" && password === "")
    throw new Error("Email and Paswoord need to be correct!");

  const user: User | null = await collectionUsers.findOne<User>({email: email});

  if (user) {
    const valid = await bcrypt.compare(user.password!, password);
    if (valid) {
      return user;
    } else {
      throw new Error("PW is wrong !");
    }
  } else {
    throw new Error("User don't exist");
  }
}
