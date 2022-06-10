import logger from 'logger';
import { failure, success } from '@/api/util';
import { getChartData } from '@/services/integration';
import { ChartData } from '~/device';

const log = logger('API', 'CHART');


// handle request and response
export async function chartData(request: ChartData.Request, response: ChartData.Response): Promise<void> {
    // const deviceID = request.query.deviceID;
    // const duration = request.query.duration;
    // const information = request.query.information;
    // const smoothness = request.query.smoothness;
    const start = request.query.start;
    const end = request.query.end;
    // console.log(deviceID, duration, information, smoothness, start, end);
    console.log(start, end);
    try {
        success(response, {
            data: await getChartData(start, end),
        });
    } catch (error) {
        log.error(error);
        failure(response, error);
    }
}
