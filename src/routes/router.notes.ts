import express from "express";
import UserController from "../controllers/notesContollers.js";
import { ensureAuth } from "../middlewares/essureAuth.js";

const notesRouter = express.Router();


const controller = new UserController();

notesRouter.use(ensureAuth);
notesRouter.get("/", controller.index);

notesRouter.get("/show", controller.show);

notesRouter.post("/create", controller.create);

notesRouter.delete("/delete", controller.delete);


export default notesRouter;