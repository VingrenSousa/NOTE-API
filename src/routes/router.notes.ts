import express from "express";
import UserController from "../controllers/notesContollers.js";

const notesRouter = express.Router();


const controller = new UserController();

notesRouter.get("/", controller.index);

notesRouter.get("/show/:id", controller.show);

notesRouter.post("/create/:user_id", controller.create);

notesRouter.delete("/delete/:id", controller.delete);


export default notesRouter;