const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Collection, ReactionUserManager } = require('discord.js');

function emptyBoard() {
	const board = [];
	const emp = ':black_circle:';
	const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven: '];
	const top = [':black_small_square:', ':black_small_square:', ':black_small_square:', ':black_small_square:', ':black_small_square:', ':black_small_square:', ':black_small_square:'];
	board.push(top);
	for(let i = 0 ; i < 7; i++) {
		const row = [];
		for(let j = 0 ; j < 7; j++) {
			row.push(emp);
		}
		board.push(row);
	}
	board.push(numbers);
	return board;
}

function createEmbed(players, turn, str) {

	const user = players[turn]['user']['username'];
	const color = players[turn]['bgcolor'];

	// inside a command, event listener, etc.
	const exampleEmbed = new MessageEmbed()
		.setTitle('Connect 4 game')
		.setColor(`${color}`)
		.setAuthor('NEN', 'https://i.imgur.com/D8Acbmx.png', 'https://www.youtube.com/channel/UCxLbR7TgreyR-ndDjgULoGw')
		.setDescription(`${players[0]['user']['username']}  :vs:  ${players[1]['user']['username']}`)
		// .setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			{ name: 'Turn', value: `${user}`, inline: true },
			{ name: 'GameID', value: '6666', inline: true },
			{ name:'Board', value: str },
		)
		.setTimestamp();

	return exampleEmbed;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect4')
		.setDescription('Starts a connect4 game')
		.addUserOption(option =>
			option.setName('enemy')
				.setDescription('Challenge your friend')
				.setRequired(false)),

	async execute(interaction, args, client) {
		let board;
		let turn;
		let players;
		let message;
		let channel;
		// console.log(args);
		if (args == undefined) {
			board = emptyBoard();
			turn = 0;
			const user2 = interaction.options.getUser('enemy') || { username: 'whoever joins' };
			// console.log(user2);
			players = {
				0 : {
					user: interaction.user,
					emote: ':yellow_circle:',
					bgcolor: '#f0cd0a',
				},
				1 : {
					user: user2,
					emote: ':red_circle:',
					bgcolor: '#fc0303',
				},
			};
		}
		else {
			board = args[0];
			players = args[1];
			turn = args[2];
			message = args[3];
		}

		let boardStr = '';
		for(let i = 0 ; i < board.length; i++) {
			for(let j = 0 ; j < board[i].length; j++) {
				boardStr += board[i][j];
			}
			boardStr += '\n';
		}

		const reactEmojis = {
			0: '0⃣', 1: '1⃣', 2: '2⃣', 3: '3⃣',
			4: '4⃣', 5: '5⃣', 6: '6⃣', 7: '7⃣',
			8: '8⃣', 9: '9⃣', 10: '🔟',
		};

		const emojiDicionary = {
			'1⃣':1, '2⃣':2, '3⃣':3, '4⃣':4,
			'5⃣':5, '6⃣':6, '7⃣':7,
		};

		const embed = createEmbed(players, turn % 2, boardStr);

		const filter = (reaction, user) => {
			return user.id === players[turn % 2].user.id;
		};
		// console.log(turn);
		if(turn === 0) {
			// const user = interaction.options.getUser('enemy');
			message = await interaction.channel.send({ embeds: [embed], fetchReply: true });
			channel = interaction.channelId;
			// console.log(channel);
			// console.log(interaction);
			for (let i = 1;i <= 7;i++) {
				message.react(reactEmojis[i]);
			}
		}
		else {
			message.react(reactEmojis[9]);
		}
		client.on('messageReactionAdd', async (reaction, user) =>{
			if(user.bot) return;
			if(reaction.message.partial) await reaction.message.fetch();
			if(reaction.partial) await reaction.fetch();
			if(!reaction.message.gild) return;
			if(reaction.message.channelId == channel) {
				console.log(reaction.emoji.name);
				/*
				switch(reaction.emoji.name) {
				case ':one:':
					//
					break;
				}
				*/
			}
		});


	},
};