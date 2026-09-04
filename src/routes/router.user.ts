import express from "express";
import UserController from "../controllers/userControllers.js";
import { ensureAuth } from "../middlewares/essureAuth.js";
import multer from "multer";
import {MULTER_CONFIG} from "../config/upload.js";
import { UserControllerAvatar } from "../controllers/UserAvatarController.js";






const upload = multer(MULTER_CONFIG)


const controller = new UserController();
const controllerUserAvatar = new UserControllerAvatar();

const myRouter = express.Router();

myRouter.post("/", controller.createUser);

myRouter.put("/",ensureAuth, controller.update);

myRouter.patch("/avatar",ensureAuth,upload.single("avatar"), controllerUserAvatar.update);


export default myRouter;