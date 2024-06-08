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

const roles = [
    {
        id: '1201037369084751953',
        label: 'testing',
    },
    {
        id: '1249129248061394996',
        label: 'testing 2',
    },
    {
        id: '1249129262376812768',
        label: 'testing 3',
    },
]

bot.on( 'ready', async (b) =>  {

    try {
        const channel = await bot.channels.cache.get('1248857972248150109');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push (
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: 'Claim or remove a role below.',
            components: [row],
        })
        process.exit();
    } catch (error) {
        console.log(error);
    }
});

bot.login(process.env.TOKEN); 