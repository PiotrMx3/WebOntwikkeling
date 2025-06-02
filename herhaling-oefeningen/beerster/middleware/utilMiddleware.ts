import {Request, Response, NextFunction} from "express";

export default function utilMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("nl-BE");
  };

  res.locals.rawColor = (rawNumber: string) => {
    const number = parseInt(rawNumber);
    let color = {};
    if (number < 5) {
      color = {type: "LOW", color: "green"};
    } else if (number < 7.5) {
      color = {type: "MEDIUM", color: "orange"};
    } else {
      color = {type: "HIGH", color: "red"};
    }

    return color;
  };

  next();
}
