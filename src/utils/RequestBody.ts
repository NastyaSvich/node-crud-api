import { IncomingMessage } from 'http';

export const getRequestBody = (req: IncomingMessage): Promise<unknown> =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        reject();
      }
    });
  });
