import { SlashCommandBuilder } from 'discord.js'
import { CommandNames, FactionSubcommands } from '../../constants'
import L from '../../i18n/i18n-node'
import { Command } from '../types'
// import { factionSystemsHandler } from './systems'

const Faction: Command = {
  builder: new SlashCommandBuilder()
    .setName(CommandNames.faction)
    .setDescription('Get information about your faction')
    .addSubcommand((subcommand) =>
      subcommand
        .setName(FactionSubcommands.systems)
        .setDescription('Get information about systems of your faction')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(FactionSubcommands.conflicts)
        .setDescription('Get information about conflicts of your faction')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(FactionSubcommands.stations)
        .setDescription('Get information about stations of your faction')
    ),
  handler: async ({ interaction, context: { locale } }) => {
    await interaction.deferReply()
    const { guildId } = interaction
    if (!guildId) {
      throw new Error('Discord guild id not found while processing faction command.')
    }
    // const faction = await getCachedFaction(cache, guildId)
    const faction = null
    if (!faction) {
      await interaction.editReply({
        content: L[locale].faction.notSetup(),
      })
    }

    // const subcommand = interaction.options.getSubcommand()
    // if (subcommand === FactionSubcommands.systems) {
    //   await factionSystemsHandler({ interaction })
    // }
  },
}

export default Faction
