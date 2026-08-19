import  express from "express";
import myRouter from "./router.user.js";
import notesRouter from "./router.notes.js";



const router = express.Router();

const middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("Middleware executed");
    next();
}

router.use("/notes",middleware, notesRouter);
router.use("/users",middleware,myRouter);

export default router;