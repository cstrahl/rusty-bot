import type { Guild } from 'discord.js';

import {
  getGuildFirestoreReference,
  getGuildsFirestoreCollectionReference
} from './firestore-helpers.js';
import type { DBGuild, DBGuildChannel, DBQueryOp } from './types.js';

export async function getDBGuildsWhere(
  prop: keyof DBGuild,
  op: DBQueryOp,
  value: unknown
): Promise<DBGuild[]> {
  const guildsCollectionRef = getGuildsFirestoreCollectionReference();

  const guildsCollectionSnapshot = await guildsCollectionRef
    .where(prop, op, value)
    .get();

  const dbGuilds: DBGuild[] = [];
  guildsCollectionSnapshot.forEach((ref) =>
    dbGuilds.push({ id: ref.id, ...ref.data() })
  );

  return dbGuilds;
}

export async function getDBGuildChannelsWhere(
  guild: Guild,
  prop: keyof DBGuildChannel,
  op: DBQueryOp,
  value: unknown
): Promise<DBGuildChannel[]> {
  const guildDocRef = getGuildFirestoreReference(guild);

  const dbChannelsCollection = await guildDocRef
    .collection('channels')
    .where(prop, op, value)
    .get();

  const dbChannels: DBGuildChannel[] = [];
  dbChannelsCollection.forEach((ref) =>
    dbChannels.push({ id: ref.id, ...ref.data() })
  );

  return dbChannels;
}
