import { string } from '@/services/influx';
import type { IClientOptions } from 'mqtt';

export type Config = {
    host: string;
    port?: number;
    topicPrefix?: string;
    options: IClientOptions;
};

export type pointData = {
    timestamp: number;
    deviceId: string;
    humidity: number;
    temperature: number;
}

export type Subscriber = (topic: string, payload: string) => void;
