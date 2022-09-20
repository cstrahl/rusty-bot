import type { GuildTextBasedChannel, VoiceBasedChannel } from 'discord.js';

import { useGetFactory, useSetFactory } from './factories.js';
import { getGuildChannelFirestoreReference } from './firestore-helpers.js';
import type { DBGetFn, DBSetFn, DBGuildChannel } from './types.js';

export function useDBGuildChannelGetFactory(
  channel: GuildTextBasedChannel | VoiceBasedChannel
): DBGetFn<DBGuildChannel> {
  const refFactory = () => getGuildChannelFirestoreReference(channel);
  return useGetFactory<DBGuildChannel>(refFactory);
}

export function useDBGuildChannelSetFactory(
  channel: GuildTextBasedChannel | VoiceBasedChannel
): DBSetFn<DBGuildChannel> {
  const refFactory = () => getGuildChannelFirestoreReference(channel);
  return useSetFactory<DBGuildChannel>(refFactory);
}

export function useDBGuildChannel(
  channel: GuildTextBasedChannel | VoiceBasedChannel
): [DBGetFn<DBGuildChannel>, DBSetFn<DBGuildChannel>] {
  const getFn = useDBGuildChannelGetFactory(channel);
  const setFn = useDBGuildChannelSetFactory(channel);

  return [getFn, setFn];
}
