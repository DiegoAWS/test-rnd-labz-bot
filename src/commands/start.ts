import { bot } from "../services/telegraf";
import { createUser, getUserById } from "../services/user";

const frontendUrl = process.env.FRONTEND_URL || "https://127.0.0.1:5173/";

bot.command('start', async (ctx) => {



    if (!ctx.from?.id || !ctx.from?.username) return ctx.reply('Something went wrong');

    const userName = ctx.from?.first_name || ctx.from?.username;
    const telegram_id = ctx.from?.id

    const user = await getUserById(telegram_id);

    let welcomeMessage = user ? `Welcome back ${userName}` : `Welcome to the bot!`

    if (!user) {
        await createUser({
            telegram_id: ctx.from?.id || 0,
            username: ctx.from?.username || "",
            first_name: ctx.from?.first_name,
            last_name: ctx.from?.last_name,
        })
    }
    ctx.reply(welcomeMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Go to web app',
                        web_app: {
                            url: `${frontendUrl}?telegramUserName=${userName}`,
                        }
                    }
                ]
            ],
        }
    });


});
