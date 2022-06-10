import type { WritePrecisionType, WriteOptions } from '@influxdata/influxdb-client';

export type Config = {
    url: string;
    bucket: string;
    org: string;
    token: string;
    precision?: WritePrecisionType;
    writeOptions?: Partial<WriteOptions>;
};

export type Payload = {
    measurement: string;
    timestamp: number;
    tags: { [key: string]: string };
    fields: { [key: string]: number | boolean | string };
};


