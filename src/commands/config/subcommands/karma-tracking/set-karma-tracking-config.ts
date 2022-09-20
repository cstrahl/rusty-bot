import type { GuildTextBasedChannel } from 'discord.js';
import { useDBGuildChannel } from '../../../../db/db-guild-channel.js';

/** Enables or disables karma tracking on a channel in Firebase */
export async function setKarmaTrackingConfig(
  channel: GuildTextBasedChannel,
  value: boolean | undefined
): Promise<string> {
  // Set value in database
  const [, setDBGuildChannel] = useDBGuildChannel(channel);
  await setDBGuildChannel({ karmaTracking: value });

  // Build response text
  const valueText = value ? 'enabled' : 'disabled';
  const response = `Karma tracking for ${channel.name} has been ${valueText}.`;
  return response;
}
