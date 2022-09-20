import type { Guild, VoiceBasedChannel } from 'discord.js';
import { getDBGuildChannelsWhere } from '../db/db-queries.js';
import type { DBGuildChannel } from '../db/types.js';

import { getRandomVoiceChannelNamesFromFile } from './get-random-voice-channel-names-from-file.js';

/** Default channel name if a list is too short to foll all the slots */
const DEFAULT_CHANNEL_NAME = 'Voice Channel';

export async function setRandomVoiceChannelNames(guild: Guild): Promise<void> {
  const { groups } = await getRandomVoiceChannelNamesFromFile();

  // Get random group
  const randomGroupIndex = Math.floor(Math.random() * groups.length);
  const names = [...groups[randomGroupIndex].names];

  // Get voice channels for the current server
  const allChannels = Array.from(guild.channels.cache);
  const allVoiceChannels: readonly VoiceBasedChannel[] = allChannels
    .map(([, channel]) => channel)
    .filter((channel) => channel.isVoiceBased()) as VoiceBasedChannel[];

  // Filter voice channels based on whats enabled
  const enabledDBGuildChannels: DBGuildChannel[] =
    await getDBGuildChannelsWhere(guild, 'randomVoiceChannelNames', '==', true);
  const enabledVoiceChannelIds = enabledDBGuildChannels.map((c) => c.id);
  const enabledVoiceChannels = allVoiceChannels.filter((voiceChannel) =>
    enabledVoiceChannelIds.includes(voiceChannel.id)
  );

  // Get list of random names
  let numDefaultVoiceChannelNames = 0;
  const nameChannelMap: [string, VoiceBasedChannel][] =
    enabledVoiceChannels.map((voiceChannel) => {
      if (names.length === 0) {
        const defaultName = `${DEFAULT_CHANNEL_NAME} ${++numDefaultVoiceChannelNames}`;
        return [defaultName, voiceChannel];
      }

      const randomIndex = Math.floor(Math.random() * names.length);
      const [randomName] = names.splice(randomIndex, 1);
      return [randomName, voiceChannel];
    });

  // Set voice channel names
  const setAllNames = nameChannelMap.map(([randomName, voiceChannel]) =>
    voiceChannel.setName(randomName)
  );
  await Promise.all(setAllNames);
}
