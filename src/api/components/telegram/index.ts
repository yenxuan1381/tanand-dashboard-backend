import express from 'express';
import * as controller from './controller';

const telegramRouter = express.Router();

telegramRouter.post('/', controller.message);

export default telegramRouter;
