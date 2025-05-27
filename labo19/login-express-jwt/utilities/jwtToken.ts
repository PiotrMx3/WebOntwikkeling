import * as jwt from "jsonwebtoken";
import {Response} from "express";
import {User} from "../types/interfaces";

export function jwtToken(res: Response, user: User) {
  const payload = user;
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "7d"});
  res.cookie("jwt", token, {httpOnly: true, sameSite: "lax", secure: true});
}
