
import type { Request,Response } from "express";
import AppErros from "../utils/appErros.js";
import Knex from "../database/knex/index.js";
type propsbodynote ={
    title:string,
    description:string,
    tags:string[]
    links:string[]

}
class NotesController {
   async create(req: Request, res: Response) { 
        const { user_id }= req.params;

        const { title, description, tags,links } :propsbodynote= req.body;

    // verificacao se todos os item foi mandando
        if(!title || !description || !tags ){
            throw new AppErros("Todos os campos são obrigatórios", 400);
        }
    // vericando se a id user

        if(!user_id){
            throw new AppErros("O id do usuário é obrigatório", 400);
        }

        
        



        const note_id = await Knex("notes").insert({
            title,
            description,
            user_id
        });
         console.log(" note kay: "+note_id[0]);

        const linksInsert = links.map((link: string) => {
            return {
             
                url: link,
                nota_id: note_id[0]
            }
        });
        console.log(" obejeto links: "+linksInsert);

        await Knex("links").insert(linksInsert);

        
        const TagsInsert = tags.map((name: string) => {
            return {
              
                name:name,
                user_id,
                nota_id: note_id[0]
            }
        });
        console.log(" obejeto tags: "+TagsInsert);
        
        await Knex("tegs").insert(TagsInsert);

        res.status(201).json({message: "Nota criada com sucesso!"});

    }




    async update(req: Request, res: Response) {

    }
}

export default NotesController;