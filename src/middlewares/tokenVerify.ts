import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import userModel from "../models/user/user.model";

dotenv.config();

const token_key = process.env.TOKEN_KEY || "rocketdata"

function verifyToken(req: Request, res: Response, next: NextFunction){ 

    const authToken = req.headers.authorization || '';
    if (!authToken ) {
        res.status(401).send("Require token!")
    }
    let token = authToken.split(' ')[1];
    const decode = jwt.verify(token, token_key);
    if(decode == null){
        res.status(402).send("Token not accepted!")
    }

    next();

}

export default verifyToken;