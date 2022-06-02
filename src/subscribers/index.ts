import { datetime, write } from '@/services/influx';
import type { pointData } from '~/mqtt';
import mqtt from '@/services/mqtt';
import logger from 'logger';


export default async function subscribers(): Promise<void> {
    const log = logger('SUBSCRIBERS');

    for (let i = 1; i <= 3; i += 1) {
        let deviceId = `dummy-temp-${i}`;

        mqtt.subscribe(`site-a/data/${deviceId}/ambient`, (topic, payload)=>{
            const data = JSON.parse(payload.toString()) as pointData
            log.info('Subscribe success', payload)

            write({
                measurement: "ambient",
                timestamp: data.timestamp,
                tags: {deviceID: data.deviceId},
                fields: {
                    humidity: data.humidity,
                    temperature: data.temperature
                }  
            })
        })
    }

    log.info('Subscribers loaded');
}