import express, {Response, Request, NextFunction} from "express";

export function middlewareUserAutho(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.locals.user = req.session.user;
  next();
}
