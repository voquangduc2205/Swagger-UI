import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../configs/route.config";
import userModel from "../../models/user/user.model";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const token_key = process.env.TOKEN_KEY || "rocketdata"

async function handleLoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).send(errorResponse.MISSING_USER_LOGIN_FIELDS);

    const user = await userModel.getUserByName(username, false);
    if (!user) {
      return res.status(401).send(errorResponse.WRONG_USERNAME_PASSWORD);
    }

    const correctPassword = user.password;
    if (password !== correctPassword) {
      return res.status(401).send(errorResponse.WRONG_USERNAME_PASSWORD);
    }

    const token = jwt.sign(
      { username: username, email: user.email, password: password }, token_key, { expiresIn: "2h",}
    );

    const newUser = {
      'username': username,
      'email': user.email,
      'password': password,
      'accessToken': token,
    }

    await userModel.updateUser(user.id, newUser)

    const response = {
      message: "Login successfully",
      accessToken: token,
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
