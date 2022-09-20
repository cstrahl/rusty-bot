import type {
  CollectionReference,
  DocumentReference,
  Firestore
} from '@google-cloud/firestore';
import type {
  Guild,
  GuildMember,
  GuildTextBasedChannel,
  VoiceBasedChannel,
  Message
} from 'discord.js';

import { DatabaseConnectionNotEstablishedError } from '../errors/rusty-bot-errors.js';
import { GLOBAL_STATE } from '../services/global-state.js';

export function useFirestore(): Firestore {
  const firestore = GLOBAL_STATE.firestore;
  if (!firestore) {
    throw new DatabaseConnectionNotEstablishedError();
  }

  return firestore;
}

export function getGuildsFirestoreCollectionReference(): CollectionReference {
  return useFirestore().collection('guilds');
}

export function getGuildFirestoreReference(guild: Guild): DocumentReference {
  return getGuildsFirestoreCollectionReference().doc(guild.id);
}

export function getGuildChannelFirestoreReference(
  channel: GuildTextBasedChannel | VoiceBasedChannel
): DocumentReference {
  return getGuildFirestoreReference(channel.guild)
    .collection('channels')
    .doc(channel.id);
}

export function getGuildMessageFirestoreReference(
  message: Message<true>
): DocumentReference {
  return getGuildChannelFirestoreReference(message.channel)
    .collection('messages')
    .doc(message.id);
}

export function getGuildMemberFirestoreReference(
  member: GuildMember
): DocumentReference {
  return getGuildFirestoreReference(member.guild)
    .collection('members')
    .doc(member.id);
}
