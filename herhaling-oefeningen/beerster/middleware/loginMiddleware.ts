import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";

export function loginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string | undefined = req.cookies?.jwt;

  if (!token) {
    console.log("token not found");
    return res.redirect("/login");
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.redirect("/login");
    } else {
      res.locals.user = user;
      next();
    }
  });
}
