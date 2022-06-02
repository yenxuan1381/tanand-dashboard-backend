import type { Telegram } from '~/api/telegram';

import logger from 'logger';
import { success, failure } from '@/api/util';
import { handleTelegram } from '@/services/telegram';

const log = logger('API', 'TELEGRAM');

export async function message(request: Telegram.Request, response: Telegram.Response): Promise<void> {
    try {
        success(response, { message: await handleTelegram(request.body), parse_mode: 'MarkdownV2' });
    } catch (e) {
        log.error(e);
        failure(response, e);
    }
}
