import express, {Response, Request, NextFunction} from "express";

export function middlewareLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.path, req.method);
  if (req.path === "/logout" && req.method === "POST") return next();
  if (req.session.user) return res.redirect("/");
  return next();
}
