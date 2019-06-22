import { Client } from 'discord.js';
import { config } from 'dotenv';

const client = new Client();
config();

client.on('message', (msg) => {
  // TODO add custom prefix & configurable prefix support
  const prefix = '!';
  if (msg.content[0] !== prefix) { return; }

  const args = msg.content.trim().split(' '); // Setting-up arguments of command
  const cmd = (args.shift() || '').toLowerCase().substring(prefix.length); // LowerCase command

  try {
    const commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, msg, args);
  } catch (e) {
    try {
      const commandFile = require(`./commands/${cmd}.ts`);
      commandFile.run(client, msg, args);
    } catch (e) {
      return;
    }
    return;
  }
});

client.login(process.env.TOKEN).then(() => {
  // tslint:disable-next-line: no-console
  console.log('All done!');
});
