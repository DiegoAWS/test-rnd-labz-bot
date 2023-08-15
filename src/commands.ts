import { bot } from "./services/telegraf";

const frontendUrl = process.env.FRONTEND_URL || "https://127.0.0.1:5173/";

bot.command('start', (ctx) => {

    const telegramUserName = ctx.from?.first_name || ctx.from?.username || 'uknown';

    ctx.reply('Welcome to the bot!', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Go to web app',
                        web_app: {
                            url: `${frontendUrl}?telegramUserName=${telegramUserName}`,
                        }
                    }
                ]
            ],
        }
    });


});
