import path from 'path';
import { Command } from 'commander';
import { serve } from '@jsnote-kc/local-api';

const isProduction = process.env.NODE_ENV === 'production';

interface LocalApiError {
  code: string;
}

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string; }) => {

    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };

    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve({
        port: parseInt(options.port),
        filename: path.basename(filename),
        dir,
        useProxy: !isProduction
      });
      console.log(
        `Opened ${filename}. Go to http://localhost:${options.port} to edit the file`
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === "EADDRINUSE") {
          console.error(
            `
            Port is in use. Try running on a different port.
            To try a different port use the -p or --port flag. E.g:
            jbook <filename> -p <port> 
            or
            jbook <filename --port=<port>
            `
          );
        }
      } else if (err instanceof Error) {
        console.log("Error: ", err.message);
      }
      process.exit(1);
      // if (err instanceof Error) {
      //   console.log(err.message);
      // } else {
      //   throw err;
      // }
    }
  });