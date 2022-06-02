import express from 'express';

import * as middleware from './middleware';

const router = express.Router();

router.use(middleware.logRequest);

export default router;
