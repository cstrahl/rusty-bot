import type { GuildMember, Message, User } from 'discord.js';

import {
  incrementDBGuildMemberProp,
  useDBGuildMember
} from '../db/db-guild-member.js';
import { useDBGuildChannel } from '../db/db-guild-channel.js';
import {
  incrementDBGuildMessageProp,
  useDBGuildMessage
} from '../db/db-guild-message.js';
import type { DBGuildMessage } from '../db/types.js';

export async function processReactionEvent(
  message: Message<true>,
  reactingUser: User,
  reactionValue: 1 | -1
): Promise<void> {
  const { member: cachedMember, author, guild, channel } = message;
  const member = cachedMember ?? (await guild.members.fetch({ user: author }));

  // Toss reaction if by the author or from a bot
  if (member.user.bot || member.user === reactingUser) {
    return;
  }

  const [getDBGuildChannel] = useDBGuildChannel(channel);
  const dbGuildChannel = await getDBGuildChannel();

  if (!dbGuildChannel?.karmaTracking) {
    return; // Channel is not enabled for tracking
  }

  const [getDBGuildMessage, setDBGuildMessage] = useDBGuildMessage(message);
  const currentDBGuildMessage = await getDBGuildMessage();
  let newDBGuildMessage: Partial<DBGuildMessage> = {};

  await incrementDBGuildMemberProp(member, 'karma', reactionValue);

  await incrementDBGuildMessageProp(message, 'reactionCount', reactionValue);

  if (!currentDBGuildMessage?.member) {
    newDBGuildMessage = { ...newDBGuildMessage, member: member.id };
  }

  if (
    !currentDBGuildMessage?.content ||
    message.cleanContent !== currentDBGuildMessage.content
  ) {
    newDBGuildMessage = { ...newDBGuildMessage, content: message.cleanContent };
  }

  const messageAttachment = message.attachments.first()?.attachment;
  if (
    messageAttachment &&
    (Buffer.isBuffer(messageAttachment) ||
      typeof messageAttachment === 'string') &&
    (!currentDBGuildMessage?.attachment ||
      messageAttachment !== currentDBGuildMessage.attachment)
  ) {
    newDBGuildMessage = {
      ...newDBGuildMessage,
      attachment: messageAttachment.toString()
    };
  }

  await setDBGuildMessage(newDBGuildMessage);
}

export async function processMessageEvent(
  message: Message<true>,
  messageValue: 1 | -1
): Promise<void> {
  const { member: cachedMember, author, guild } = message;
  const member = cachedMember ?? (await guild.members.fetch({ user: author }));

  await incrementDBGuildMemberProp(member, 'posts', messageValue);
}

export async function processMemberEditEvent(
  oldMember: GuildMember,
  newMember: GuildMember
): Promise<void> {
  if (newMember.user.bot || newMember.displayName === oldMember.displayName) {
    return;
  }

  const [, setDBGuildMember] = useDBGuildMember(oldMember);

  await setDBGuildMember({
    name: newMember.displayName
  });
}
