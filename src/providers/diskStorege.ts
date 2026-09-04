import fs from "fs";
import path from "path";

import{TMP_FOLDER,UPLOAD_FOLDER}from "../config/upload.js";

class DiskStorage{

    async saveFile(file:string|undefined){
        if(file){
            await fs.promises.rename(
                path.resolve(TMP_FOLDER,file),    
                path.resolve(UPLOAD_FOLDER,file)  
            )
        return file;
        }else{
            console.error("erro arquivo nao movido do tpm, arquivo invalido")
        }
     
       
    }

    async deleteFile(file:string){
        const filePath=  path.resolve(UPLOAD_FOLDER,file)
        try{
            await fs.promises.stat(filePath);
        }catch{
            return false;
        }
           await fs.promises.unlink(filePath);

    }
}

export default DiskStorage;



