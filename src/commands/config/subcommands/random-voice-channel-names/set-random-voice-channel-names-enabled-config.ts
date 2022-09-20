import type { Guild } from 'discord.js';

import { useDBGuild } from '../../../../db/db-guild.js';
import { disableRandomVoiceChannelNames } from '../../../../utilities/disable-random-voice-channel-names.js';
import { enableRandomVoiceChannelNames } from '../../../../utilities/enable-random-voice-channel-names.js';

export async function setRandomVoiceChannelNamesEnabledConfig(
  guild: Guild,
  value: boolean | undefined
): Promise<string> {
  // Set value in database
  const [, setDBGuild] = useDBGuild(guild);
  await setDBGuild({ randomVoiceChannelNames: value });

  // Enable / disable feature
  if (value) {
    enableRandomVoiceChannelNames(guild);
  } else {
    disableRandomVoiceChannelNames(guild);
  }

  // Build response text
  const valueText = value ? 'enabled' : 'disabled';
  const response = `Random voice channel names have been ${valueText}.`;
  return response;
}
