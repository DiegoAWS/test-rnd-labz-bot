import { Context, Markup } from "telegraf";
import { bot } from "../services/telegraf";
import { UserAttributes } from "../db/models/User";
import { getAllUsers, getUserByUsername, updateUser } from "../services/user";


const adminOptionsKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('List users', 'list_users'),
    Markup.button.callback('Toggle admin for user', 'toggle_admin')
]);


const addBackButtonToResponse= (ctx: Context,message: string)=>{
    ctx.editMessageText(message, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('Back', 'admin_back')]
            ]
        }
    });
}

const ADMIN_PASSWORD = "1234abc"; // JUST FOR TEST

bot.command('admin', async (ctx) => {
    const user = await getUserByUsername(ctx.from?.username!);

    ctx.state.test= true;
    if (user?.is_admin) {
        return ctx.reply('Select an action:', adminOptionsKeyboard);
    }
    

    ctx.reply('Enter the admin password:');
    bot.on('text', async (enteredPasswordCtx) => {
        // Check if the entered password matches the admin password
        if (enteredPasswordCtx.message.text === ADMIN_PASSWORD) {
// make user admin
             await updateUser(ctx.from?.id!, { is_admin: true });

            ctx.reply('Password correct now you are admin');
        } else {
            ctx.reply('Incorrect password.');
        }
    });
});


bot.action('list_users', async (ctx) => {
    const users: UserAttributes[] = await getAllUsers();

    // sort by is_admin and then alphabetically by username

    console.log(ctx.state)
    const header = "<b>Users List:</b>\n\n<i>Admins:</i>\n";

    const admins = users.filter(user => user.is_admin)
    .sort((a,b)=> a.username.toLowerCase().localeCompare(b.username.toLowerCase()))
    .map((user) =>  `<pre>${user.username}</pre>\n`);
    

    const nonAdminsHeader = "\n<i>Non-Admins:</i>\n";

    const nonAdmins = users.filter(user => !user.is_admin)
    .sort((a,b)=> a.username.toLowerCase().localeCompare(b.username.toLowerCase()))
    .map((user) =>  `<pre>${user.username}</pre>\n`);

    const message = header + admins.join('') + nonAdminsHeader + nonAdmins.join('');

    addBackButtonToResponse(ctx,message);
    
});




bot.action('toggle_admin', async (ctx) => {
    ctx.editMessageText('Please send the <i>username</i> of the user you want to toggle admin for.', { parse_mode: 'HTML' }); 
    bot.on('text', async (ctx) => {
        const username = ctx.message.text;
        const user: UserAttributes | undefined = await getUserByUsername(username);

        if (user?.telegram_id) {
            const updatedUser = await updateUser(user.telegram_id, { is_admin: !user.is_admin });
            ctx.reply(`Admin status for <b>${username}</b> has been <b>${updatedUser?.is_admin ? "enabled" : "disabled"}</b>.`, { parse_mode: 'HTML' }); 
        } else {
            ctx.reply('<i>User not found.</i>', { parse_mode: 'HTML' });  // Specify HTML format
        }
    });
});


// Handling the 'Back' option
bot.action('admin_back', async (ctx) => {
    ctx.editMessageText('Select an action:', adminOptionsKeyboard);
});
