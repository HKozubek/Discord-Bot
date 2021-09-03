// import axios from "axios";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { lichessToken } = require('../config.json');
const endPoint = 'https://lichess.org/';

const headers = {
	Authorization: 'Bearer ' + lichessToken,
};

const antichess = {
	clock: {
		limit: 180,
		increment: 0,
	},
	variant: 'antichess',
};

const standard = {
	clock: {
		limit: 600,
		increment: 0,
	},
};

const atomic = {
	clock: {
		limit: 300,
		increment: 0,
	},
	variant: 'atomic',
};

const game = {
	antichess,
	standard,
	atomic,
};


const axios = require('axios').default;

const exampleEmbed = new MessageEmbed()
	.setColor('#212121')
	.setAuthor('NEN', 'https://i.imgur.com/D8Acbmx.png', 'https://www.youtube.com/channel/UCxLbR7TgreyR-ndDjgULoGw')
	.setDescription(':chess_pawn: :chess_pawn: :chess_pawn: :chess_pawn:')
	.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessSet.jpg')
	.setTimestamp();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chess')
		.setDescription('Sends link to a Chess game')
		.addStringOption(option =>
			option.setName('variant')
				.setDescription('Choos the variant of chess')
				.addChoice('antichess', 'antichess')
				.addChoice('standard', 'standard')
				.addChoice('atomic', 'atomic')),
	async execute(interaction) {
		const string = interaction.options.getString('variant') || 'antichess';
		const challenge = 'api/challenge/open';
		const pending = axios({
			method: 'post',
			url: endPoint + challenge,
			headers: headers,
			data: game[string],
		});
		let Title = '';
		switch(string) {
		case 'antichess':
			Title = 'Antichess variant, 3 + 0 ';
			break;
		case 'standard':
			Title = 'Standard chess variant, 10 + 0';
			break;
		case 'atomic':
			Title = 'Atomic chess variant, 5 + 0';
			break;
		}
		await pending.then(function(result) {

			exampleEmbed.setTitle(Title)
				.setURL(result.data.challenge.url);
			interaction.reply({ embeds: [exampleEmbed], fetchReply: true }).then(message => message.react('💯'));
		});
	},
};