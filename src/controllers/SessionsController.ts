import type { Request, Response } from "express";
import Knex from "../database/knex/index.js";

import AppErros from "../utils/appErros.js";
import { compare } from "bcryptjs";
import authConfig from "../config/auth.js";
import jwt from "jsonwebtoken";



export default class SessionsController {
    async create(req: Request, res: Response) {

        const { email, password } = req.body;

        const user = await Knex("users").where({ email }).first();

        if (!user) {
            throw new AppErros("Usuário não encontrado!", 401);
        }
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppErros("Usuário não encontrado!", 401);
        }

        const { secret, expirenIn } = authConfig.jwt;
        
        const token = jwt.sign({}, secret, {
            subject: String(user.id),
            expiresIn: expirenIn,
        });

       return res.status(200).json({user, token });
    }


}