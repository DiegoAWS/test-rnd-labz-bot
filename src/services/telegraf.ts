import { Context, Telegraf } from "telegraf";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

if (!telegramBotToken) {
    throw new Error('TELEGRAM_BOT_TOKEN missing in env!');
}

const bot = new Telegraf<Context>(telegramBotToken);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();

export { bot }