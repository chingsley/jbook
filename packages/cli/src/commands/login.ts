import { Command } from 'commander';

export const loginCommand = new Command()
  .command('login')
  .description('Handle user login')
  .action(() => {
    console.log(`This is just a dummy command
     to illustrate how comander 
     is setup for handling multiple commands,
    e.g the the login and the serve command`);
  });