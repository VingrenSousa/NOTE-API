import type { Request,Response } from "express";
import AppErros from "../utils/appErros.js";
import OpenDatabase from "../database/sqlite/index.js";
import {compare, hash} from "bcryptjs";

type User = {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    old_password?: string;
};

class UserController{
    async createUser(req: Request, res:Response){
        const { name, email,password } = req.body;

        // Validação dos campos obrigatórios
        if(!name || !email || !password){
            throw new AppErros("Todos os campos são obrigatórios", 400);
        }


        // Abrindo a conexão com o banco de dados
        const dataBase = await OpenDatabase();

        // Verificando se o email já existe no banco de dados
        const chaqueUserExists = await dataBase.get("SELECT * FROM users WHERE email = ?", [email]);

        //chamando o erro caso o email já exista
        if(chaqueUserExists){
            throw new AppErros("Este e-mail já está em uso", 400);
        }
        // Hashing da senha do usuário criptografando a senha para segurança
        const hashedPassword = await hash(password, 8);

        //criando o usuário no banco de dados
       await dataBase.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
       );
       res.status(201).json({message: "Usuário criado com sucesso!"});
   
    }
    async update(req: Request, res:Response){
        const { name ,email,password,old_password }:User = req.body;
        const { id } = req.params;

       const dataBase = await OpenDatabase();

        // dofirmando se id do usuario existe
       const user = await dataBase.get("SELECT * FROM users WHERE id = ?", [id]);
        // id fornecido nao e asociando a nenhum usuario
       if(!user){
        throw new AppErros("Usuário não encontrado", 404);
       }

       //verificando se o email foi alterado e se o novo email já está em uso por outro usuário
       const userWithUpdatedEmail = await dataBase.get("SELECT * FROM users WHERE email = ?",[email]);

       // verificando se o usuário com o email atualizado existe e se o id do usuário com o email atualizado é diferente do id do usuário que está sendo atualizado
       if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
         throw new AppErros("este email ja esta em uso", 404);
       }

       // se name for fornecido coloque caso contraria coloque apenas o valor atual do name, se email for fornecido coloque caso contraria coloque apenas o valor atual do email
        user.name = name ?? user.name;   
        user.email = email ?? user.email;


        if(password && !old_password){
            throw new AppErros("Você precisa informar a senha antiga para definir a nova senha", 400);
        }

        if(password && old_password){
            //verificando se a senha antiga informada é igual a senha atual do usuário
            const checkOldPassword = await compare(old_password, user.password);
            if(!checkOldPassword){
                throw new AppErros("A senha antiga não confere", 400);
            }
            user.password = await hash(password, 8);
        }
       // Atualizando o usuário no banco de dados
        await dataBase.run(
            `UPDATE users SET
                name = ?, 
                email = ?,
                password = ?,
                update_at = datetime('now') 
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
        );

        res.status(200).json({message: "Usuário atualizado com sucesso!"});
    



       
    }
}

export default UserController;