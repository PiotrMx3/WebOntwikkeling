import { Request, Response, NextFunction } from "express";

export function ulity(req: Request, res: Response, next: NextFunction) {
  res.locals.caesar = (text: string, shift: number): string => {
    const alphabet: string[] = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    let formatted: string = "";

    for (let i = 0; i < text.length; i++) {
      const index: number = alphabet.indexOf(text[i].toLowerCase());

      index === -1
        ? (formatted += text[i])
        : (formatted += alphabet[(index + shift) % 26]);
    }

    return formatted;
  };

  res.locals.reverse = (text: string): string => {
    let formatted: string = "";

    for (let i = text.length; i > 0; i--) {
      formatted += text[i - 1];
    }

    return formatted;
  };

  res.locals.shorten = (text: string, short: number): string => {
    let formatted: string = "";

    if (text.length > short) {
      for (let i = 0; i < short; i++) {
        formatted += text[i];
      }
      formatted += "...";
    } else {
      formatted = text;
    }

    return formatted;
  };

  next();
}
