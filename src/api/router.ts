import express from 'express';
import * as controller from './device';
import * as middleware from './middleware';

const router = express.Router();

router.use(middleware.logRequest);
router.get('/chart', controller.chartData);


export default router;
