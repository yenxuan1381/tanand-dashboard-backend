import type { Payload } from '~/influx';

import logger, { LogLevel } from 'logger';
import {
    InfluxDB,
    Point,
    QueryApi,
    WriteApi,
    WriteOptions,
    WritePrecisionType,
    ParameterizedQuery,
} from '@influxdata/influxdb-client';

const log = logger('INFLUX');

const DEFAULT_WRITE_OPTIONS: Partial<WriteOptions> = {
    batchSize: 250,
    flushInterval: 3000,
    maxRetries: 100,
    maxRetryDelay: 180000,
    minRetryDelay: 1000,
    retryJitter: 5000,
    writeSuccess(lines) {
        log.debug(`Write success! ${lines.length} points flushed.`);
    },
    async writeFailed(error, lines, attempts) {
        log.warn(`Write failed ${attempts} times due to ${error.message}`);
        log.debug(`Failed data: ${lines}`);
    },
};

export default class InfluxService {
    private writeApi: WriteApi;
    private queryApi: QueryApi;

    constructor(
        url: string,
        token: string,
        org: string,
        bucket: string,
        precision: WritePrecisionType,
        writeOptions: Partial<WriteOptions> = {},
        minLevel?: LogLevel
    ) {
        if (minLevel) log.setSettings({ minLevel });

        const influxDB = new InfluxDB({ url, token });
        this.queryApi = influxDB.getQueryApi(org);
        this.writeApi = influxDB.getWriteApi(org, bucket, precision, {
            ...DEFAULT_WRITE_OPTIONS,
            ...writeOptions,
        });
    }

    write<T extends Payload>(payload: T | T[]): void {
        Array.isArray(payload) ? payload.forEach(this.writePoint.bind(this)) : this.writePoint(payload);
        log.silly('Write success');
    }

    async query<T>(query: string | ParameterizedQuery): Promise<T[]> {
        try {
            return (await this.queryApi.collectRows(query)) ?? [];
        } catch (e) {
            if (e.code !== 'ECONNREFUSED') log.warn({ query, ...e });
            throw e;
        }
    }

    private writePoint(payload: Payload): void {
        const { measurement, timestamp, tags, fields } = payload;
        const point = new Point(measurement).timestamp(timestamp);

        Object.entries(tags).forEach(([key, val]) => point.tag(key, val));
        Object.entries(fields).forEach(([key, val]) => {
            switch (typeof val) {
                case 'number':
                    point.floatField(key, val);
                    break;
                case 'boolean':
                    point.booleanField(key, val);
                    break;
                case 'string':
                    point.stringField(key, val);
                    break;
                default:
                    throw Error(`Unhandled typeof ${typeof val} in ${key}: ${val}`);
            }
        });
        this.writeApi.writePoint(point);
    }
}
