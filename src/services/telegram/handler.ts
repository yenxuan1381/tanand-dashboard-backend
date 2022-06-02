import type { Message } from 'node-telegram-bot-api';

import logger, { LogLevel } from 'logger';
import { escape } from './index';

const minLevel = (process.env.TELEGRAM_LOG_LEVEL as LogLevel) || 'info';
const log = logger('TELEGRAM');
log.setSettings({ minLevel });

export async function handleTelegram(message: Message): Promise<string | undefined> {
    log.debug('Handling message', message);
    const text = message.text!;

    switch (true) {
        case /\/help/.test(text):
            return help();
    }
}

function help(): string {
    return escape(`
Hello, Welcome to Tanand Node Template TS!
    `);
}
