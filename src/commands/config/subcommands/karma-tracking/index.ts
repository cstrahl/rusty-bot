import type { Firestore } from '@google-cloud/firestore';
import type {
  ChatInputCommandInteraction,
  GuildTextBasedChannel
} from 'discord.js';
import { setKarmaTrackingConfig } from './set-karma-tracking-config.js';
import { KarmaTrackingSubcommand } from './types.js';

export async function karmaTrackingSubcommand(
  firestore: Firestore,
  interaction: ChatInputCommandInteraction
): Promise<string> {
  const subcommandName = interaction.options.getSubcommand(
    true
  ) as KarmaTrackingSubcommand;

  switch (subcommandName) {
    case KarmaTrackingSubcommand.Channel: {
      const value = interaction.options.getBoolean('value', true);
      const channel = interaction.options.getChannel(
        'channel',
        true
      ) as GuildTextBasedChannel;
      return await setKarmaTrackingConfig(firestore, channel, value);
    }
  }
}
