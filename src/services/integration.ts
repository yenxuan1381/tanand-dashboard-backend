import type { Device } from '~/device';
import logger, { LogLevel } from 'logger';
import { query } from './influx';

const minLevel = (process.env.DEVICE_API_LEVEL as LogLevel) || 'info';

const log = logger('INTEGRATION');
log.setSettings({ minLevel });

export async function getChartData(
    // deviceID: string,
    // duration: number | undefined,
    // field: string,
    // smoothness: number,
    start: number | undefined,
    end: number | undefined
): Promise<Array<Device.DataPoint>> {
    // const range = `range(start: -${start}s, stop: -${end}s)`;
    const q: Array<Device.DeviceQueryResult> = await query(
        `
        from(bucket: "dashboard")
        |> range(start: ${start}, stop: ${end})
        |> filter(fn: (r) => r["_measurement"] == "ambient")
        |> aggregateWindow(every: 1m, fn: mean, createEmpty: false)
        
        `
    );
    return q.map((device) => {
        return {
            field: device._field,
            device: device.deviceID,
            time: device._time,
            value: device._value,
           
        };
    });
    
}
