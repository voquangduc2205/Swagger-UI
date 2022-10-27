import * as express from "express";
import authController from "./auth.controller";

const authRouter = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *      - auth
 *     summary: Login user
 *     description: Login with the user's credentials.
 *     requestBody:
 *          description: User's credentials - email and password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserLoginCredential'
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
 *        '401':
 *          description: Wrong email or password
 *        '500':
 *          description: Something went wrong
 */

authRouter.post("/login", authController.handleLoginUser);

export default authRouter;
