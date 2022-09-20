import type { VoiceBasedChannel } from 'discord.js';

import { useDBGuildChannel } from '../../../../db/db-guild-channel.js';

export async function setRandomVoiceChannelNamesChannelConfig(
  channel: VoiceBasedChannel,
  value: boolean | undefined
): Promise<string> {
  // Set value in database
  const [, setDBGuildChannel] = useDBGuildChannel(channel);
  await setDBGuildChannel({ randomVoiceChannelNames: value });

  // Build response text
  const valueText = value ? 'enabled' : 'disabled';
  const response = `Random voice channel names for ${channel.name} have been ${valueText}.`;
  return response;
}
