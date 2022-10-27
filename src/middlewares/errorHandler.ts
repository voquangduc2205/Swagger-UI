import { Errback, Request, Response, NextFunction } from "express";
import { errorResponse } from "../configs/route.config";

function errorHandler(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  return res.status(500).send(errorResponse.DEFAULT_500_ERROR);
}

module.exports = errorHandler;
