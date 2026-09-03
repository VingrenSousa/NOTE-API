import  express from "express";
import myRouter from "./router.user.js";
import notesRouter from "./router.notes.js";
import tegsRouter from "./router.tegs.js";
import sessionsRouter from "./sessions.routes.js";




const router = express.Router();



router.use("/notes", notesRouter);
router.use("/sessions", sessionsRouter);
router.use("/users",myRouter);
router.use("/tegs",tegsRouter);

export default router;