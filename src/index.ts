import { Telegraf, Context } from 'telegraf';
import dotenv from 'dotenv';
dotenv.config();

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

if (!telegramBotToken) {
    throw new Error('TELEGRAM_BOT_TOKEN missing in env!');
}

const bot = new Telegraf<Context>(telegramBotToken);

bot.command('start', (ctx) => {
    
    ctx.reply('Welcome to the bot!', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Go to web app',
                        web_app: {
                            url: 'https://test-rnd-labz-bot.netlify.app',
                        }
                    }
                ]
            ]
        }
    });

});



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();