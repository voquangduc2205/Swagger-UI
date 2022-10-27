import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../configs/route.config";
import userModel from "../../models/user/user.model";

const USERNAME_REGEX = /^[a-zA-Z0-9]{6,14}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

async function validateRegisterInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).send(errorResponse.MISSING_USER_REGISTER_FIELDS);

  if (await userModel.exists(username, email)) {
    return res.status(409).send(errorResponse.USER_EXISTS);
  }

  if (!USERNAME_REGEX.test(username))
    return res.status(400).send(errorResponse.INVALID_USERNAME);

  if (!EMAIL_REGEX.test(email))
    return res.status(400).send(errorResponse.INVALID_EMAIL);

  if (!PASSWORD_REGEX.test(password))
    return res.status(400).send(errorResponse.INVALID_PASSWORD);

  next();
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const registedUser = await userModel.addUser(req.body);
    return res.status(201).send(registedUser);
  } catch (error) {
    next(error);
  }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userModel.getUsers();
    return res.send(users);
  } catch (error) {
    next(error);
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).send(errorResponse.DEFAULT_404_ERROR);
    }
    return res.send(user);
  } catch (error) {}
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).send(errorResponse.DEFAULT_404_ERROR);
    }
    return res.send(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).send(errorResponse.DEFAULT_404_ERROR);
    }
    return res.send(deletedUser);
  } catch (error) {
    next(error);
  }
}

const userController = {
  validateRegisterInput,
  registerUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userController;
