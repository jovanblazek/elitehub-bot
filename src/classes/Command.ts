import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders'
import { CacheType, CommandInteraction } from 'discord.js'
import Keyv from 'keyv'
import { Tick } from './Tick'

export type CommandParameters = {
  name: string
}

export type CommandCallbackArgs = {
  interaction: CommandInteraction<CacheType>
  tick: Tick
  cache: Keyv
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