import jwt from "jsonwebtoken";

import appErros from "../utils/appErros.js";
import authConfig from "../config/auth.js";
import type { NextFunction, Request, Response } from "express";
export function ensureAuth(req:Request, res:Response, next:NextFunction) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new appErros("jwt invalido", 401);
    }

    const [, token] = authHeader.split(" ");

    if(!token){  
        throw new appErros("jwt invalido", 401);
    }
    try{
       
        const { sub } = jwt.verify(token, authConfig.jwt.secret);

        req.user={
            id:Number(sub)
        }
        return next();

    }catch{
        throw new appErros("jwt invalido", 401);
    }

}