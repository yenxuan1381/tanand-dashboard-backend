import { Config } from '~/api';
import { query } from '@/services/influx';

import cors from 'cors';
import config from 'config';
import logger from 'logger';
import express from 'express';
import router from './router';
import cookieParser from 'cookie-parser';
import listEndpoints from 'express-list-endpoints';


const { port } = config.get<Config>('api');
const http = require('http');
const { Server } = require('socket.io');

const log = logger('LOADER', 'API');

const app = express();


app.set('trust proxy', true);
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/', router);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});


server.listen(port, () => {
    log.info(
        `API Server started @${port}. Listening to routes:`,
        listEndpoints(app)
            .sort(({ path: a }, { path: b }) => (a < b ? -1 : a > b ? 1 : 0))
            .map(({ path, methods }) => `${methods.toString().padEnd(8)}:${path}`)
    );
});

export function emitToSocket(data: DeviceData) {
    io.emit("latestdata", data)
}

export default server;
