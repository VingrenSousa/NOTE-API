
import type { Request, Response } from "express";
import Knex from "../database/knex/index.js";

class TagController {
   async index(req:Request ,res:Response){
        const {id}=req.user;

        
        const teg = await Knex("tegs")
        .where({user_id:id})

        res.json(teg)
    }
}


export default TagController