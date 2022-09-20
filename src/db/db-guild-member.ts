import { FieldValue } from '@google-cloud/firestore';
import type { GuildMember } from 'discord.js';

import { useGetFactory, useSetFactory } from './factories.js';
import { getGuildMemberFirestoreReference } from './firestore-helpers.js';
import type { DBGetFn, DBSetFn, DBGuildMember } from './types.js';

export function useDBGuildMemberGetFactory(
  guildMember: GuildMember
): DBGetFn<DBGuildMember> {
  const refFactory = () => getGuildMemberFirestoreReference(guildMember);
  return useGetFactory<DBGuildMember>(refFactory);
}

export function useDBGuildSetFactory(
  guildMember: GuildMember
): DBSetFn<DBGuildMember> {
  const refFactory = () => getGuildMemberFirestoreReference(guildMember);
  return useSetFactory<DBGuildMember>(refFactory);
}

export function useDBGuildMember(
  guildMember: GuildMember
): [DBGetFn<DBGuildMember>, DBSetFn<DBGuildMember>] {
  const getFn = useDBGuildMemberGetFactory(guildMember);
  const setFn = useDBGuildSetFactory(guildMember);

  return [getFn, setFn];
}

export async function incrementDBGuildMemberProp(
  member: GuildMember,
  prop: keyof DBGuildMember,
  n: number
): Promise<void> {
  const [, setDBGuildMember] = useDBGuildMember(member);

  await setDBGuildMember({ [prop]: FieldValue.increment(n) });
}
