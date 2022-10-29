import * as express from "express";
import routeValidator from "../../middlewares/routeValidator";
import userController from "./user.controller";
import verifyToken from "../../middlewares/tokenVerify";

const userRouter = express.Router();

/**
 * @openapi
 * /dashboard/user:
 *   post:
 *     tags:
 *      - user
 *     summary: Register user
 *     description: Register new user account.
 *     requestBody:
 *          description: User's credentials - email, username and password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CreateUserRequest'
 *          required: true
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponse'
 *        '400':
 *          description: Invalid query
 *        '409':
 *          description: User already exists
 *        '500':
 *          description: Something went wrong
 */

userRouter.post(
  "/",
  userController.validateRegisterInput,
  userController.registerUser
);

/**
 * @openapi
 * /dashboard/user:
 *   get:
 *     tags:
 *      - user
 *     summary: Get all users
 *     description: Retrieve a full list of users.
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/UserResponse'
 *        '500':
 *          description: Something went wrong
 */

userRouter.get("/",  verifyToken, userController.getUsers);

/**
 * @openapi
 * /dashboard/user/{userId}:
 *   get:
 *     tags:
 *      - user
 *     summary: Get single user
 *     description: Retrieve user detail.
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user to return
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponse'
 *        '404':
 *          description: User does not exist
 *        '500':
 *          description: Something went wrong
 */

userRouter.get("/:id", routeValidator.validateIDParam, userController.getUser);

/**
 * @openapi
 * /dashboard/user/{userId}:
 *   patch:
 *     tags:
 *      - user
 *     summary: Update user information
 *     description: Modify user information.
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user to return
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *          description: Update an existent user in the database
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UpdateUserRequest'
 *          required: true
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponse'
 *        '404':
 *          description: User does not exist
 *        '500':
 *          description: Something went wrong
 */

userRouter.patch(
  "/:id",
  routeValidator.validateIDParam,
  userController.updateUser
);

/**
 * @openapi
 * /dashboard/user/{userId}:
 *   delete:
 *     tags:
 *      - user
 *     summary: Delete single user
 *     description: Delete the user account.
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user to return
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponse'
 *        '404':
 *          description: User does not exist
 *        '500':
 *          description: Something went wrong
 */

userRouter.delete(
  "/:id",
  routeValidator.validateIDParam,
  userController.deleteUser
);

export default userRouter;