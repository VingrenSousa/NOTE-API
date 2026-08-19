import express from "express";
import UserController from "../controllers/tegsController.js";

const tegsRouter = express.Router();


const controller = new UserController();

tegsRouter.get("/:user_id", controller.index);




export default tegsRouter;