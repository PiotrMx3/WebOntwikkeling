import { Request, Response, NextFunction } from "express";

interface ErrorHandlerOptions {
  statusCode: number;
}

export const errorHandler = (options: ErrorHandlerOptions) => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(options.statusCode).render("error", {
      message: err.message,
      stack: err.stack,
    });
  };
};
