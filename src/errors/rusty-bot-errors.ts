export class MissingEnvironmentVariableError extends Error {
  constructor(variableName: string) {
    super(`${variableName} must be provided`);
    this.name = 'MissingEnvironmentVariableError';
  }
}

export class InvalidColorStringError extends Error {
  constructor(colorString: string) {
    super(`${colorString} is not a valid hex color code!`);
    this.name = 'InvalidColorStringError';
  }
}

/**
 * This should be thrown when a command throws an expected error that
 * should be reported to the user. Typically this is thrown due to
 * user input error.
 */
export class RustyBotCommandError extends Error {
  constructor(replyMessage: string, internalMessage?: string) {
    super(replyMessage);
    this.name = 'RustyBotCommandError';

    if (internalMessage) {
      console.error(internalMessage);
    }
  }
}

export class RustyBotInvalidArgumentError extends RustyBotCommandError {
  constructor(argumentName: string, reason?: string) {
    const formattedReason = reason ? `\n${reason}` : '';
    const formattedMessage = `\`${argumentName}\` is invalid!${formattedReason}`;
    super(formattedMessage);
    this.name = 'RustyBotInvalidArgumentError';
  }
}
