require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

bot.on( 'ready', (b) =>  {
    console.log(`${b.user.tag} is online.`);
});

bot.on('messageCreate', (msg) => {

    if (msg.author.bot) {
        return;
    }

    if (msg.content == 'steve') {
        msg.reply('chigga');
    }

    if (msg.content.includes('embed')) {
        let fullMessage = msg.content;
        
        let modifiedMessage = fullMessage.replace(/^embed /, '');
        
        const embed = new EmbedBuilder()
           .setTitle(`${modifiedMessage}`)
           .setColor('#e1b8ff');
        
        const imageUrlRegex = /(https?:\/\/[^\s]+)/g;
        const imageUrls = msg.content.match(imageUrlRegex);
        
        if (imageUrls && imageUrls.length > 0) {
            embed.setImage(imageUrls[0]);
        }
        
        msg.channel.send({ embeds: [embed] });
        console.log(`Modified message: ${modifiedMessage}`);
    }

});

bot.on('interactionCreate', (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'add') {
        interaction.reply(`The sum is ${interaction.options.get('first-number').value + interaction.options.get('second-number').value}`);

    } else if (interaction.commandName === 'subtract') {
        interaction.reply(`The difference is ${interaction.options.get('first-number').value - interaction.options.get('second-number').value}`);

    } else if (interaction.commandName === 'multiply') {
        interaction.reply(`The answer is ${interaction.options.get('first-number').value * interaction.options.get('second-number').value}`);

    } else if (interaction.commandName === 'divide') {
        interaction.reply(`The answer is ${interaction.options.get('first-number').value / interaction.options.get('second-number').value}`);

    } else if (interaction.commandName === 'mod') {
        interaction.reply(`The difference is ${interaction.options.get('first-number').value % interaction.options.get('second-number').value}`);

    }
});

bot.login(process.env.TOKEN); 