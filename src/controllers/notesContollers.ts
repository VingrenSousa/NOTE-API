
import {  response, type Request,type Response } from "express";
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


        const linksInsert = links.map((link: string) => {
            return {
             
                url: link,
                note_id: note_id[0]
            }
        });
        

        await Knex("links").insert(linksInsert);

        
        const TagsInsert = tags.map((name: string) => {
            return {
              
                name:name,
                user_id,
                note_id: note_id[0]
            }
        });
       
        await Knex("tegs").insert(TagsInsert);

        res.status(201).json({message: "Nota criada com sucesso!"});

    };

    async show(req: Request, res: Response) {
        const {id}= req.params;

        const note = await Knex("notes").where({ id }).first();

        const tegs = await Knex('tegs').where({note_id:id}).orderBy('name')

        const links = await Knex('links').where({note_id:id}).orderBy('created_at')

        res.json({...note,tegs,links});
    };

    async delete(req: Request, res: Response) {
        const {id}=req.params;
        await Knex("notes").where({id}).delete();
        res.json({"STATUS":"DELETADO COM SUCESSO"})
    }
    async index(req: Request, res: Response){
  
        const {title,user_id,tegs}=req.query

        
        let notes
       if(typeof tegs !== "string"){
         throw new AppErros("tegs deve ser uma string",400)
       }
        if(tegs){
            const filterTags=tegs.split(",").map(tags=>tags)
           notes = await Knex("tegs")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id",
            ])
            .where("notes.user_id", user_id) // pegando somemte notas que seja do id do usuario 
            .whereLike("notes.title", `%${title}%`)// pegando title onde a de alguma forma title ante ou depois
            .whereIn("tegs.name", filterTags)// pegando somente onde tenhas  tegs
            .innerJoin("notes", "notes.id", "tegs.note_id")//juntando tabelas
            .orderBy("notes.title");//que pegue tudo por ordem de title, no caso alfabetica
            
        }else{
            notes= await Knex('notes')
            .where({user_id:user_id})
            .whereLike("title",`%${title}%`)
            .orderBy("title")

        }
          
       const userTegs = await Knex("tegs").where({user_id});
       
       const notesWithTags = notes.map((item)=>{
        
        const notestegs=userTegs.filter(tag=>tag.note_id===item.id)

        return{
            ...item,
            tags:notestegs
        }
       })
    
        return res.json(notesWithTags)
    }
}

export default NotesController;