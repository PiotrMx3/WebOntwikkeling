import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";

export function jwtAutho(req: Request, res: Response, next: NextFunction) {
  const token: string | undefined = req.cookies?.jwt;

  if (!token) {
    console.log("No token found, redirecting to login");
    return res.redirect("/");
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.redirect("/");
    res.locals.user = user;
    next();
  });
}
