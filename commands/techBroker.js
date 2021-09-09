const got = require('got')
const jsdom = require('jsdom')
const Discord = require('discord.js')
const { divider, embedColor } = require('../config.json')
const { systemError } = require('../helpers/error')
const { parseSystemName } = require('../helpers/systemName')
const { validateArgs } = require('../helpers/arguments')

const { JSDOM } = jsdom

module.exports = {
	name: 'broker',
	description: 'Vypíše 5 najbližších Tech Brokerov',
	arguments: [
		{
			name: 'system',
			description: 'Východzí systém (systém v ktorom sa nachádzaš)',
		},
	],
	async execute(message, args) {
		try {
			if (!validateArgs(args, message)) return

			const { systemName, systemNameWeb } = parseSystemName(args)
			const url = `https://inara.cz/nearest-stations/?ps1=${systemNameWeb}&pi13=&pi14=0&pi15=0&pi16=&pi1=0&pi18=0&pi19=0&pa1%5B26%5D=1&pi8=&pi9=0&pi3=&pi4=0&pi5=0&pi6=0&pi7=0&pi23=0`

			const fetchedData = await got(url)
			const dom = new JSDOM(fetchedData.body)

			const rows = dom.window.document.querySelectorAll('tr')
			if (rows.length === 0) {
				systemError(systemName, message)
				return
			}

			const parsedData = this.parseData(rows)

			message.channel.send({
				embed: this.generateEmbed(url, parsedData),
			})
		} catch (error) {
			console.log(error)
		}
	},
	parseData(rows) {
		const data = []
		for (let i = 1; i < 6; i++) {
			const object = {}
			const links = rows[i].querySelectorAll('td a.inverse')

			let j = 0
			links.forEach((element) => {
				if (j === 0) object.station = element.textContent
				else object.system = element.textContent
				j++
			})

			const distance = rows[i].querySelector('td:nth-last-child(2)')
			if (distance != null) {
				object.distanceLs = distance.previousElementSibling.textContent
				object.distance = distance.textContent
			}

			const type = rows[i].querySelector('td:first-child')
			if (type != null) object.type = type.textContent

			data.push(object)
		}
		return data
	},
	generateEmbed(url, data) {
		const embed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle(`Technology Brokers`)
			.setDescription(`[INARA](${url})\n${divider}`)

		data.forEach((el) => {
			embed.addField(
				`${el.type} - ${el.system}`,
				`${el.station} - ${el.distanceLs}\n\`${el.distance}\`\n`
			)
		})

		return embed
	},
}
