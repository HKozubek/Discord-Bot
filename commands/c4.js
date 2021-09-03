const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


function makeid() {
	const length = 4;
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
	}
	result += '-';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
	}
	return result;
}

const exampleEmbed = new MessageEmbed()
	.setTitle('Connect 4')
	.setURL(`https://c4arena.com/${makeid()}`)
	.setColor('#e81809')
	.setAuthor('NEN', 'https://i.imgur.com/D8Acbmx.png', 'https://www.youtube.com/channel/UCxLbR7TgreyR-ndDjgULoGw')
	.setDescription(':yellow_circle: :red_circle: :yellow_circle: :red_circle: :yellow_circle: :red_circle: ')
	.setThumbnail('https://m.media-amazon.com/images/I/91o1Wkq42eL._AC_SX679_.jpg')
	.setTimestamp();


module.exports = {
	data: new SlashCommandBuilder()
		.setName('c4')
		.setDescription('Sends link to connect4 game'),
	async execute(interaction) {
		// await interaction.reply(`:yellow_circle: :red_circle: -> [Play](https://c4arena.com/${makeid()})`);
		const message = await interaction.reply({ embeds: [exampleEmbed], fetchReply: true });
		console.log(message);
		message.react('💯');
	},
};

