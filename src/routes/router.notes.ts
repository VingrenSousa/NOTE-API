import express from "express";
import UserController from "../controllers/notesContollers.js";
import { ensureAuth } from "../middlewares/essureAuth.js";

const notesRouter = express.Router();


const controller = new UserController();

notesRouter.use(ensureAuth);

notesRouter.get("/", controller.index);

notesRouter.get("/show/:id", controller.show);

notesRouter.post("/", controller.create);

notesRouter.delete("/", controller.delete);


export default notesRouter;