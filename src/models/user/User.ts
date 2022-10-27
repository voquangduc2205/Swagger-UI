import { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    UserLoginCredential:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    CreateUserRequest:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *    UpdateUserRequest:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *    UserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: 635a370943a08300fdbab218
 *        username:
 *          type: string
 *          example: username
 *        email:
 *          type: string
 *          example: email@email.com
 *        createdAt:
 *          type: string
 *          example: 2022-01-01T00:00:00Z
 *        updatedAt:
 *          type: string
 *          example: 2022-01-01T00:00:00Z
 */

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User: Model<IUser> = model("User", UserSchema);

export default User;
