import type { Request,Response } from "express";
import AppErros from "../utils/appErros.js";

class UserController{
    createUser(req: Request, res:Response){
        const { name, email,password } = req.body;
        
        if(!name || !email || !password){
            throw new AppErros("Missing required fields", 400);
        }
        res.json({ message: "User created successfully", user: req.body });
    }
}

export default UserController;