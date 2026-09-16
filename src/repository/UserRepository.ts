import OpenDatabase from "../database/sqlite/index.js";
interface porpsUserRepository{
    findbyEmail(email:string):any,
    Create(props:porpsCreat):any
}
type porpsCreat={
    name:string,
    email:string,
    Password:string

}
class UserRepository implements porpsUserRepository{
    async findbyEmail(email:string){
     // Abrindo a conexão com o banco de dados
        const dataBase = await OpenDatabase();

        // Verificando se o email já existe no banco de dados
        const user = await dataBase.get("SELECT * FROM users WHERE email = ?", [email]);
        return user
    }
    async Create({name,email,Password}:porpsCreat){

        const dataBase = await OpenDatabase();
        const userId = await dataBase.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, Password]
       );

       return {id:userId}
    }
}

export default UserRepository