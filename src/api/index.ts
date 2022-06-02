import type { Config } from '~/api';

import cors from 'cors';
import config from 'config';
import logger from 'logger';
import express from 'express';
import router from './router';
import cookieParser from 'cookie-parser';
import listEndpoints from 'express-list-endpoints';

const { port } = config.get<Config>('api');

const log = logger('LOADER', 'API');

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/', router);
app.listen(port, () => {
    log.info(
        `API Server started @${port}. Listening to routes:`,
        listEndpoints(app)
            .sort(({ path: a }, { path: b }) => (a < b ? -1 : a > b ? 1 : 0))
            .map(({ path, methods }) => `${methods.toString().padEnd(8)}:${path}`)
    );
});

export default app;
