import type * as API from '~/api';

export namespace ChartData {
    import DataPoint = Device.DataPoint;
    type Request = API.Request<
        never,
        never,
        never,
        {
            deviceID: string;
            duration: number | undefined;
            information: string;
            smoothness: number;
            start: number | undefined;
            end: number | undefined;
        }
    >;
    type Response = API.Response<{
        data: DataPoint[];
    }>;
}

export namespace Summary {
    type Request = API.Request<
        never,
        never,
        never,
        {
            deviceID: string;
            summaryFn: string;
            information: string;
            duration: number;
        }
    >;
    type Response = API.Response<{
        data: number;
    }>;
}

export namespace Device {
    type RawDeviceData = {
        timestamp: number;
        deviceId: string;
        temperature: number;
        humidity: number;
    };
    type DeviceQueryResult = {
        result: string;
        table: number;
        _start: string;
        _stop: string;
        _time: string;
        _value: number;
        _field: string;
        _measurement: string;
        deviceID: string;
    };

    type DeviceQuery = {
        time: number; //time in minute
        deviceID: string;
        information: string;
        smoothness: number;
    };

    type DeviceInfo = {
        deviceID: string, 
        humidity: Array<DataPoint>,
        temperature:Array<DataPoint>
    }

    type DataPoint = {
        time : string,
        value : number
    }
}   