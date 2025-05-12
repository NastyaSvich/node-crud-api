import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { userRouter } from './routers/UserRouter';

export const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    await userRouter(req, res);
  },
);

export const startServer = (port: number): Server => {
  return server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
