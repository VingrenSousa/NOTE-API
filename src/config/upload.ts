import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

import multer from "multer";
import AppErros from "../utils/appErros.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const TMP_FOLDER=path.resolve(__dirname,"..","..","tmp");

const UPLOAD_FOLDER=path.resolve(TMP_FOLDER,"uploads")


const MULTER_CONFIG={
    storage: multer.diskStorage({
        destination: TMP_FOLDER,

        filename:(req,file,cb)=>{

            const fileHash=crypto.randomBytes(10).toString("hex");
            const fileName=`${fileHash}-${file.originalname}`;
            
            return cb(null,fileName);
        }
    })
}

export {TMP_FOLDER,UPLOAD_FOLDER,MULTER_CONFIG}

   

