import express from "express";
import router from "./routes/layout.js";
import AppError from "./utils/appErros.js";
import runMigrations from "./database/sqlite/migrations/index.js";



const app = express();

  //open database connection
runMigrations();

app.use(express.json());

app.use(router);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

       if (err instanceof AppError) {
       return res.status(err.statusCode).json({ "error": err.message });
    }
    console.error(err);
    return res.status(500).json({ "error":"Internal Server Error" });
    
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
})