import express from "express";
import UserController from "../controllers/tegsController.js";
import { ensureAuth } from "../middlewares/essureAuth.js";

const tegsRouter = express.Router();


const controller = new UserController();

tegsRouter.get("/",ensureAuth, controller.index);




export default tegsRouter;