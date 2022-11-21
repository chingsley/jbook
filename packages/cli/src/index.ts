// const serve = require('local-api'); // doesn't work in typescript

import { program } from 'commander';
import { serveCommand } from './commands/serve';
import { loginCommand } from './commands/login';

program
  .addCommand(serveCommand)
  .addCommand(loginCommand);

program.parse(process.argv);