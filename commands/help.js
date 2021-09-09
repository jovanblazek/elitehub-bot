const Discord = require('discord.js')
const { validateArgs } = require('../helpers/arguments')
const { divider, embedColor } = require('../config.json')
const { getCommands } = require('../data/Commands')
const { displayError } = require('../helpers/error')
const { getCommandSyntax, getArgumentOptions } = require('../helpers/commadSyntax')

const DEFAULT_HELP = `${divider}\n\`?help\` - Vypíše **zoznam** podporovaných príkazov \n\n\
\`?dis <system1> : <system2>\` - Vypočíta **vzdialenosť** medzi 2 systémami \n\n\
\`?inf <system>\` - Vypíše **influence** a stavy frakcíí v systéme \n\n\
\`?itrc <argument>\` \n\
\u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \
\`systems\` - Vypíše všetky **systémy**, v ktorých je ITRC \n\
\u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \
	\`stations\` - Vypíše všetky **stanice** pod kontrolou ITRC \n\
\u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \
	\`conflicts\` - Vypíše všetky **konflikty** ITRC \n\n\
\`?tick\` - Vypíše čas posledného BGS **ticku** \n\n\
\`?trader <system>\` - Vypíše 5 najbližších **Material Traderov** \n\n\
\`?broker <system>\` - Vypíše 5 najbližších **Technology Brokerov** \n\n\
\`?factors <system>\` - Vypíše 5 najbližších **Interstellar Factors** (len Orbitaly s L padmi)`

module.exports = {
	name: 'help',
	description: 'Help!',
	execute(message, args) {
		// basic help command
		if (args.length === 0) {
			const outputEmbed = new Discord.MessageEmbed()
				.setColor(embedColor)
				.setTitle('🔨 Podporované príkazy')
				.setDescription(DEFAULT_HELP)

			message.channel.send({ embed: outputEmbed })
			return
		}
		// if have more args than one, don't do anything
		if (!validateArgs(args, message, 1)) {
			return
		}

		const inputCommand = args[0]
		const commands = getCommands()

		if (commands.has(inputCommand)) {
			try {
				const command = commands.get(inputCommand)

				console.log(command.name, command.description)
				console.log(getCommandSyntax(command))

				// if any of the arguments have options, print them
				command.arguments.forEach((el) => {
					if (el.options && el.options.length > 0) {
						console.log(getArgumentOptions(el))
					}
				})
			} catch (error) {
				console.error(error)
				displayError('Pri vykonávaní príkazu sa vyskytla chyba!', message)
			}
		}
	},
}
