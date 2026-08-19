import express from "express";
import UserController from "../controllers/notesContollers.js";

const notesRouter = express.Router();


const controller = new UserController();

notesRouter.post("/create/:user_id", controller.create);

notesRouter.put("/update/:id", controller.update);


export default notesRouter;