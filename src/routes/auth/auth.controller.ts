import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../configs/route.config";
import userModel from "../../models/user/user.model";

async function handleLoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send(errorResponse.MISSING_USER_LOGIN_FIELDS);

    const user = await userModel.getUserByEmail(email, false);
    if (!user) {
      return res.status(401).send(errorResponse.WRONG_EMAIL_PASSWORD);
    }

    const correctPassword = user.password;
    if (password !== correctPassword) {
      return res.status(401).send(errorResponse.WRONG_EMAIL_PASSWORD);
    }

    const response = {
      message: "Login successfully",
    };
    return res.send(response);
  } catch (error) {
    next(error);
  }
}

const authController = {
  handleLoginUser,
};

export default authController;
