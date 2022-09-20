import { FieldValue } from '@google-cloud/firestore';
import type { Message } from 'discord.js';

import { useGetFactory, useSetFactory } from './factories.js';
import { getGuildMessageFirestoreReference } from './firestore-helpers.js';
import type { DBGetFn, DBSetFn, DBGuildMessage } from './types.js';

export function useDBGuildMessageGetFactory(
  message: Message<true>
): DBGetFn<DBGuildMessage> {
  const refFactory = () => getGuildMessageFirestoreReference(message);
  return useGetFactory<DBGuildMessage>(refFactory);
}

export function useDBGuildMessageSetFactory(
  message: Message<true>
): DBSetFn<DBGuildMessage> {
  const refFactory = () => getGuildMessageFirestoreReference(message);
  return useSetFactory<DBGuildMessage>(refFactory);
}

export function useDBGuildMessage(
  message: Message<true>
): [DBGetFn<DBGuildMessage>, DBSetFn<DBGuildMessage>] {
  const getFn = useDBGuildMessageGetFactory(message);
  const setFn = useDBGuildMessageSetFactory(message);

  return [getFn, setFn];
}

export async function incrementDBGuildMessageProp(
  message: Message<true>,
  prop: keyof DBGuildMessage,
  n: number
): Promise<void> {
  const [, setDBGuildMessage] = useDBGuildMessage(message);

  await setDBGuildMessage({ [prop]: FieldValue.increment(n) });
}
