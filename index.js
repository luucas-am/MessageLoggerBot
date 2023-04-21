const { Client, GatewayIntentBits, Events, Partials } = require("discord.js")
const { TOKEN } = require("./config.json")
const { EmbedBuilder } = require("@discordjs/builders")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [ Partials.Message ]
})

client.login(TOKEN)

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`)
})

client.on(Events.MessageDelete, msg => {
    if(!msg.partial) {
        const chn = client.channels.cache.get("INSERT CHANNEL ID")
        const embed = new EmbedBuilder()
            .setColor(0x774394)
            .setTitle("Message Deleted")
            .setAuthor({
                name: `${msg.author.username} ${msg.author.tag.slice(-msg.author.username.length)}`,
                iconURL:msg.author.displayAvatarURL()
            })
            .setDescription("Message didn't have text")
            .setThumbnail(msg.author.displayAvatarURL())
            .addFields({ name: '\u200B', value: '\u200B' })
            .setTimestamp()
            .setImage(msg.guild.iconURL())

        if (msg.content.length > 0) {
            embed.setDescription(`Message Content:\n${msg.content}`)
        }

        msg.attachments.forEach( attachment => {
            embed.addFields({name:"Attachment", value:attachment.url })
        })

        chn.send({ embeds: [embed] })
    }
})

client.on(Events.MessageUpdate, msg => {
    if(!msg.partial) {
        const chn = client.channels.cache.get("INSERT CHANNEL ID")
        const embed = new EmbedBuilder()
            .setColor(0x774394)
            .setTitle("Message Edited")
            .setAuthor({
                name: `${msg.author.username} ${msg.author.tag.slice(-msg.author.username.length)}`,
                iconURL:msg.author.displayAvatarURL()
            })
            .setDescription("Message didn't have text")
            .setThumbnail(msg.author.displayAvatarURL())
            .addFields({ name: '\u200B', value: '\u200B' })
            .setTimestamp()
            .setImage(msg.guild.iconURL())

        if (msg.content.length > 0) {
            embed.setDescription(`Message Content:\n${msg.content}`)
        }

        msg.attachments.forEach( attachment => {
            embed.addFields({name:"Attachment", value:attachment.url })
        })

        chn.send({ embeds: [embed] })
    }
})