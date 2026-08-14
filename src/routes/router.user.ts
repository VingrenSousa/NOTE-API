import express from "express";
import UserController from "../controllers/userControllers.js";

const myRouter = express.Router();


const controller = new UserController();

myRouter.post("/", controller.createUser);

myRouter.put("/update/:id", controller.update);


export default myRouter;