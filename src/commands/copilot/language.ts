import L from '../../i18n/i18n-node'
import { baseLocale, isLocale } from '../../i18n/i18n-util'
import { Prisma } from '../../utils'
import { CommandHandler } from '../types'

export const setupLanguagenHandler: CommandHandler = async ({
  interaction,
  context: { locale },
}) => {
  const { guildId } = interaction
  if (!guildId) {
    return // We should never get here as this check is done in the parent command
  }

  const newLocale = interaction.options.getString('language') || baseLocale
  if (!isLocale(newLocale)) {
    await interaction.editReply(L[locale].error.general())
    return
  }
  await Prisma.preferences.upsert({
    where: { guildId },
    create: { guildId, language: newLocale, timezone: 'UTC' },
    update: { language: newLocale },
  })
  await interaction.editReply(L[newLocale].copilot.language.saved())
}
