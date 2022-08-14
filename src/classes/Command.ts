import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders'
import { CacheType, CommandInteraction } from 'discord.js'

export type CommandParameters = {
  name: string
}

export type CommandCallbackArgs = {
  interaction: CommandInteraction<CacheType>
}

export class Command {
  params: CommandParameters
  builder:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>

  callback: (args: CommandCallbackArgs) => Promise<void>

  constructor(
    params: CommandParameters,
    builder:
      | SlashCommandBuilder
      | SlashCommandSubcommandsOnlyBuilder
      | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>,
    callback: (args: CommandCallbackArgs) => Promise<void>
  ) {
    this.params = params
    this.builder = builder
    this.callback = callback
  }
}
