import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { errorResponse } from "../configs/route.config";

function validateIDParam(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json(errorResponse.INVALID_QUERY);
  }
  next();
}

const routeValidator = {
  validateIDParam,
};

export default routeValidator;
