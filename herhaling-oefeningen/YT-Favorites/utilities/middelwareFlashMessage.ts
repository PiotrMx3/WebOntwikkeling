import express, {Response, Request, NextFunction} from "express";

export function middlewareFlashMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.title = "Hello World";

  if (req.session.flashMessage) {
    res.locals.flashMessage = req.session.flashMessage;
    delete req.session.flashMessage;
  } else {
    res.locals.flashMessage = undefined;
  }

  next();
}
