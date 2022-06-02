export function escape(message: string): string {
    return message.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

export { handleTelegram } from './handler';
