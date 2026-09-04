import {  type Request, type Response } from "express";
import knex from "../database/knex/index.js";;
import AppErros from "../utils/appErros.js";
import DiskStorage from "../providers/diskStorege.js";

export  class  UserControllerAvatar {
    async update(req:Request,res:Response){

        const diskStorage = new DiskStorage


        const user_id=req.user.id
        
        const avatarFilename =req.file?.filename

        const users= await knex("users").select("*").where({id:user_id}).first();

        if(!users){
            new AppErros("somente usuarios",401)

        }

        if(users.avatar){
            await diskStorage.deleteFile(users.avatar)
        }

        const filename= await diskStorage.saveFile(avatarFilename)

        users.avatar=filename
        await knex("users").update(users).where({id:user_id})
        res.json({
            "image":filename
        })


    }

}