const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const exampleEmbed = new MessageEmbed()
	.setTitle('Battleships')
	// .setURL(`https://c4arena.com/${makeid()}`)
	.setColor('#4824ff')
	.setAuthor('NEN', 'https://i.imgur.com/D8Acbmx.png', 'https://www.youtube.com/channel/UCxLbR7TgreyR-ndDjgULoGw')
	.setDescription(':cruise_ship: :ship: :cruise_ship: :ship: :cruise_ship: :ship:')
	.setThumbnail('https://www.thesprucecrafts.com/thmb/VJ9isRZIWh2IowJYMf2vqhr_BBk=/3456x2592/smart/filters:no_upscale()/battleshipgame-2255204904_2532c22488_o-58f6d59c5f9b581d5999b338.jpg')
	.setTimestamp();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bships')
		.setDescription('Sends link to Battleships game'),
	async execute(interaction) {
		const id = Math.floor(Math.random() * 90_000_000) + 10_000_000;
		exampleEmbed.setURL(`http://en.battleship-game.org/id${id}`);
		const message = await interaction.reply({ embeds: [exampleEmbed], fetchReply: true });
		message.react('💯');
	},
};

