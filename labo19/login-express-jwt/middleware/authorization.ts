import {Request, Response, NextFunction} from "express";

export function autorizationSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect("/");
  }
}
