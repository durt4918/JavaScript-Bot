require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

bot.on('ready', () => {
    console.log(`${bot.user.tag} is online.`);
});

bot.on('messageCreate', (msg) => {
    if (msg.author.bot ||!msg.content.trim()) return;

    if (msg.content.toLowerCase() === 'steve') {
        msg.reply('chigga');
    }
});

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    const executeCommand = async () => {
        switch (commandName) {
            case 'add':
                await interaction.reply(`The sum is ${interaction.options.getNumber('first-number') + interaction.options.getNumber('second-number')}`);
                break;
            case 'subtract':
                await interaction.reply(`The difference is ${interaction.options.getNumber('first-number') - interaction.options.getNumber('second-number')}`);
                break;
            case 'multiply':
                await interaction.reply(`The answer is ${interaction.options.getNumber('first-number') * interaction.options.getNumber('second-number')}`);
                break;
            case 'divide':
                await interaction.reply(`The answer is ${interaction.options.getNumber('first-number') / interaction.options.getNumber('second-number')}`);
                break;
            case 'mod':
                await interaction.reply(`The difference is ${interaction.options.getNumber('first-number') % interaction.options.getNumber('second-number')}`);
                break;
            default:
                await interaction.reply('Unknown command.');
        }
    };

    try {
        await executeCommand();
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
    }
});

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
        await interaction.editReply("I couldn't find that role");
        return;
    }

    const member = interaction.member;
    const hasRole = member.roles.cache.has(role.id);

    if (hasRole) {
        await member.roles.remove(role);
        await interaction.editReply(`The role ${role.name} has been removed.`);
    } else {
        await member.roles.add(role);
        await interaction.editReply(`The role ${role.name} has been added.`);
    }
});

bot.login(process.env.TOKEN);
