import {Router} from 'express';

import SessionsController from '../controllers/SessionsController.js';

const sessionsRoutesController = new SessionsController();

const sessionsRouter = Router();

sessionsRouter.post("/", sessionsRoutesController.create);

export default sessionsRouter;