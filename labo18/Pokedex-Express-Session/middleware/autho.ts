import {Request, Response, NextFunction} from "express";

export function fn_AuthoSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.player) {
    return res.redirect("/");
  } else {
    res.locals.player = req.session.player;
    next();
  }
}
