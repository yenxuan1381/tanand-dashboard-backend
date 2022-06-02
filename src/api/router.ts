import express from 'express';

import * as middleware from './middleware';
import telegramRouter from './components/telegram';

const router = express.Router();

router.use(middleware.logRequest);
router.use('/telegram', telegramRouter);

export default router;
