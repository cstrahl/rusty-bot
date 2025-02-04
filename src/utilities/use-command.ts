import { COMMANDS } from '../commands/index.js';
import type { Command } from '../types/command.js';
import type { CommandConstructorParameters } from '../types/command-constructor-parameters.js';
import type { CommandDerived } from '../types/command-derived.js';
import { RustyBotCommandError } from '../errors/rusty-bot-errors.js';

export function useCommand(
  commandOrCommandName: CommandDerived | string,
  params: CommandConstructorParameters
): Command {
  const commandDerived =
    typeof commandOrCommandName === 'string'
      ? COMMANDS.find((cmd) => new cmd(...params).name === commandOrCommandName)
      : commandOrCommandName;

  if (!commandDerived) {
    throw new RustyBotCommandError(
      'Uh oh, something went very wrong. Contact an admin.',
      `useCommand called with ${commandOrCommandName as string}`
    );
  }

  return new commandDerived(...params);
}
