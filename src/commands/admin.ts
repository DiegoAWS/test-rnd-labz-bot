import { Markup } from "telegraf";
import { bot } from "../services/telegraf";
import { UserAttributes } from "../db/models/User";
import { getAllUsers, getUserByUsername, updateUser } from "../services/user";

bot.command('admin', async (ctx) => {

    return ctx.reply('Select an action:', Markup.inlineKeyboard([
        Markup.button.callback('List users', 'list_users'),
        Markup.button.callback('Toggle admin for user', 'toggle_admin')
    ]));
});

bot.action('list_users', async (ctx) => {
    const users: UserAttributes[] = await getAllUsers();
    let message = "Users:\n";

    users.forEach(user => {
        message += `${user.username} (${user.is_admin ? "Admin" : "User"})\n`;
    });

    ctx.editMessageText(message);
});

bot.action('toggle_admin', async (ctx) => {

    ctx.editMessageText('Please send the username of the user you want to toggle admin for.');
    bot.on('text', async (ctx) => {
        const username = ctx.message.text;
        const user: UserAttributes | undefined = await getUserByUsername(username); // You'll need to define this function

        if (user?.id) {
            const updatedUser = await updateUser(user.id, { is_admin: !user.is_admin });
            ctx.reply(`Admin status for ${username} has been ${updatedUser?.is_admin ? "enabled" : "disabled"}.`);
        } else {
            ctx.reply('User not found.');
        }
    });
});