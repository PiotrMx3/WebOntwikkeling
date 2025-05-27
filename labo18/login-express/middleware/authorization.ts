import {Request, Response, NextFunction} from "express";

export function autorization(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect("/");
  }
}
