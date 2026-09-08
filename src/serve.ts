import "dotenv/config";

import express from "express";
import router from "./routes/layout.js";
import AppError from "./utils/appErros.js";
import runMigrations from "./database/sqlite/migrations/index.js";
import { UPLOAD_FOLDER } from "./config/upload.js";
import Cors from "cors"; 




const app = express();




  //open database connection sqlite
runMigrations();

app.use(express.json());
app.use(Cors())

app.use("/file",express.static(UPLOAD_FOLDER))

app.use(router);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

       if (err instanceof AppError) {
       return res.status(err.statusCode).json({ "error": err.message });
    }
    console.error(err);
    return res.status(500).json({ "error":"Internal Server Error" });
    
});


app.listen(process.env.PORT, () => {
  console.log("Server is running on ");
})