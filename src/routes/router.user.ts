import express from "express";
import UserController from "../controllers/userControllers.js";
import { ensureAuth } from "../middlewares/essureAuth.js";

const myRouter = express.Router();


const controller = new UserController();

myRouter.post("/", controller.createUser);

myRouter.put("/",ensureAuth, controller.update);


export default myRouter;