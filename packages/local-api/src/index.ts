import express from 'express';

export const serve = (port: number, filename: string, dir: string) => {
  // console.log({ port, filename, dir });
  const app = express();

  app.listen(port, () => {
    console.log('Listening on port', port);
  });
};