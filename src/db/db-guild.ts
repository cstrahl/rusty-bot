import type { Guild } from 'discord.js';

import { useGetFactory, useSetFactory } from './factories.js';
import { getGuildFirestoreReference } from './firestore-helpers.js';
import type { DBGetFn, DBSetFn, DBGuild } from './types.js';

export function useDBGuildGetFactory(guild: Guild): DBGetFn<DBGuild> {
  const refFactory = () => getGuildFirestoreReference(guild);
  return useGetFactory<DBGuild>(refFactory);
}

export function useDBGuildSetFactory(guild: Guild): DBSetFn<DBGuild> {
  const refFactory = () => getGuildFirestoreReference(guild);
  return useSetFactory<DBGuild>(refFactory);
}

export function useDBGuild(guild: Guild): [DBGetFn<DBGuild>, DBSetFn<DBGuild>] {
  const getFn = useDBGuildGetFactory(guild);
  const setFn = useDBGuildSetFactory(guild);

  return [getFn, setFn];
}
