import type { WhereFilterOp } from '@google-cloud/firestore';

export interface DBRoot {
  readonly id: string;
}

export interface DBGuild {
  readonly id: string;
  readonly randomVoiceChannelNames?: boolean;
}

export interface DBGuildChannel {
  readonly id: string;
  readonly karmaTracking?: boolean;
  readonly randomVoiceChannelFrequency?: string;
  readonly randomVoiceChannelNames?: boolean;
}

export interface DBGuildMember {
  readonly about?: string;
  readonly id: string;
  readonly infoColor?: string;
  readonly karma?: number;
  readonly name?: string;
  readonly posts?: number;
}

export interface DBGuildMessage {
  readonly attachment?: string;
  readonly content?: string;
  readonly id: string;
  readonly member?: string;
  readonly reactionCount?: number;
}

export type DBGetFn<T extends object> = () => Promise<T | null>;
export type DBSetFn<T extends object> = (value: Partial<T>) => Promise<void>;

export type DBQueryOp = WhereFilterOp;
