
import type { Request, Response } from "express";
import Knex from "../database/knex/index.js";

class TagController {
   async index(req:Request ,res:Response){
        const {user_id}=req.params

        
        const teg = await Knex("tegs")
        .where({user_id:user_id})

        res.json(teg)
    }
}


export default TagController