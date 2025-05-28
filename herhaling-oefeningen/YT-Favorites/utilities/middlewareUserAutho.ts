import express, {Response, Request, NextFunction} from "express";

export function middlewareUserAutho(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    return res.redirect("/login");
  }
  next();
}
